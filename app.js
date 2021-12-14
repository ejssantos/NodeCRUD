//alter user 'root'@'localhost' identified with mysql_native_password by '124306'; 
//flush privileges; 

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlEncodeParser=bodyParser.urlencoded({extended:false});
const sql=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'124306',
    port:'3306'
});
sql.query("use nodejs");

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

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
//app.use('/img', express.static('img'));


//======================================
//Routes and Templates
//======================================
//app.get("/:id?", function(req, res){
app.get("/", function(req, res){
    /*res.send("<h1>Página Inicial</h1>");*/
    /*res.sendFile(__dirname+"\\index.html");*/

    //console.log(req.params.id);
    //res.render('index', {id:req.params.id});
    res.render('index');
});

app.get("/javascript", function(req, res){
    res.sendFile(__dirname+'/js/javascript.js');
});

app.get("/style", function(req, res){
    res.sendFile(__dirname+'/css/style.css');
});

app.get("/inserir", function(req, res){
    res.render("inserir");
});

app.post("/controllerForm", urlEncodeParser, function(req, res){
    //console.log(req.body.name);
    sql.query("insert into user values(?, ?, ?)", [req.body.id, req.body.name, req.body.age]);
    res.render('controllerForm');
});


//======================================
//Start server
//======================================
app.listen(3000, function(re, res){
    console.log('Servidor executando...');
});