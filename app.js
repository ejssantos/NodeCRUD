const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();


//======================================
//Template engine
//======================================
//app.engine("handlebars", handlebars.defaultLayout('main'));   //erro
//Source: https://stackoverflow.com/questions/33979051/typeerror-handlebars-registerhelper-is-not-a-function
var handlebarsConf = handlebars.create({
    helpers: {
        sayHello: function () { alert("Hello World") },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        }
    },
    defaultLayout: 'main',
    partialsDir: ['views/layouts/']
});

app.engine('handlebars', handlebarsConf.engine);
app.set('view engine', 'handlebars');


//======================================
//Routes and Templates
//======================================
app.get("/:id?", function(req, res){
    /*res.send("<h1>Página Inicial</h1>");*/
    /*res.sendFile(__dirname+"\\index.html");*/

    //console.log(req.params.id);
    res.render('index', {id:req.params.id});
    //res.render('index');
});


//======================================
//Start server
//======================================
app.listen(3000, function(re, res){
    console.log('Servidor executando...');
});