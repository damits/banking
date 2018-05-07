var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();
app.use(cors())
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sampleLogin2');
var index = require('./routes/index');
var banking = require('./routes/banking');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/banking', banking);
app.use('/', index);


var port = 3001;
app.listen(port, ()=>
{console.log("server start at port:", port)})
module.exports = app;
