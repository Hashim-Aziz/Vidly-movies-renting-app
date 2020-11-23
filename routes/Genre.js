const express = require('express');
const Joi = require('joi');
const Router = express.Router();




const Genres = [
    {id : 1, Name : 'Crime'},
    {id : 2, Name : 'Romance'},
    {id : 3, Name : 'Thriller'}
];

Router.get('/',(req,res)=>{
    res.send(Genres);
});


Router.get('/:id', (req,res) => {
    const genre = Genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(400).send('The Genre with the given ID was not found');

    res.send(genre);
})



Router.post('/', (req,res) => {
    
    const result = ValidateGenre(req.body);
    if(result.error) return res.status(400).send(result);
    
    const genre = {
        id : Genres.length+1,
        Name : req.body.Name
    };
    Genres.push(genre);
    res.send(genre);
});

Router.put('/:id', (req,res) => {
    let genre = Genres.find( g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(400).send('The Genre with the given ID was not found.');

    const { error } = ValidateGenre(req.body);
    if(error) return res.status(400).send(error);

    genre.Name=req.body.Name;
    res.send(genre);
});

Router.delete('/:id', (req,res) => {
    const genre = Genres.find(g => g.id === parseInt(req.params.id));

    if(!genre) return res.status(400).send('The Genre with the given ID was not found.');

    const index = Genres.indexOf(genre);
    Genres.splice(index,1);
    res.send(genre);
});

function ValidateGenre(genre){
    const schema =Joi.object({
        Name : Joi.string().min(3).required()
    });
    
    return schema.validate(genre);
}

module.exports = Router;