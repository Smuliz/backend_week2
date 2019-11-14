'use strict';
const express = require('express');
const cors = require('cors')
const multer = require('multer')
const mysql = require('mysql2')
const dotenv = require('dotenv').config();




const app = express();
const port = 3000;
const catRoute = require('./routes/catRoute.js');
const userRoute = require('./routes/userRoute.js');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('uploads'));

app.use('/cat', catRoute);
app.use('/user', userRoute);

app.get('/', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
