const express=require("express");
const path=require("path");
const fs=require("fs");
const port=5000;
const app=express();


//mongoose related stuf
const mongoose = require('mongoose');
const { stringify } = require("querystring");
const { Agent } = require("http");
mongoose.connect('mongodb://localhost/webster', { useNewUrlParser: true, useUnifiedTopology: true });

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));//if error occur print this
db.once('open',function(){
   console.log("we are connected bro/sis..")
});
var KittySchema = new mongoose.Schema({
   username: String,//s is capital
   age:String,
   email:String,
   password:String
 });
 //schema ke bad hi model banana
 var Kitten = mongoose.model('Kitten', KittySchema);

//EXPRESS RELATED STUFF
//static file
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG RELATED STUFF
app.set("views",path.join(__dirname,'views'));
app.set("view engine","hbs");

//express route

    app.get("/",function(req,res){
        res.render("index");
       
     })

    
   app.get("/Safety",function(req,res){
      res.render("safety");
     
   })
   app.get("/Aboutus",function(req,res){
    res.render("aboutus");
   
 })
   
   app.post("/",function(req,res){
    var myData = new Kitten(req.body);
    myData.save(()=>{
       console.log(req.body);
       username=req.body.username;
       email=req.body.email;
       password=req.body.password;

       res.send(`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta http-equiv="X-UA-Compatible" content="IE=edge">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Document</title>
           <style>
         body{
             background-color: #93cece;
         }
     </style>
       </head>
       <body>
           <h1>hellow world</h1>
           <p>my name is ${username}</p>
           <p>and ${username} email is${email}</P>
           <p>and ${username} password is${password}</P>
       </body>
       </html>
       `);
    })
   
   
 })
  
//express listen

app.get("/Support",function(req,res){
   res.render("support");
  
})
app.get("/Learn",function(req,res){
    res.render("support");
   
 })
 app.get("/Login",function(req,res){
    res.render("login");
   
 })
 app.get("/Cancel",function(req,res){
    res.render("index.hbs");
   
 })
  
 app.listen(port,function(req,res){
    console.log(`your website running succesfully on ${port}`);
 })
 