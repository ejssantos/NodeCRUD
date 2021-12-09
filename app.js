const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();


//Start server
app.listen(3000, function(re, res){
    console.log('Servidor executando...');
});