const express = require('express');
const Joi = require('joi');
const app = express();
const genre = require('./routes/Genre');


app.use(express.json());
app.use('/api/genres',genre);





const port = process.env.port || 4000;
app.listen(port, () => console.log(`Listening from post ${port}`) );