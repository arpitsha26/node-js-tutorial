const http = require('http');
const fs=require('fs')
const url = require('url');
const express= require('express');

const app= express();
app.get('/',(req,res)=>{
    return res.send("hello from home page"
    )
})

app.get('/about', (req,res)=>{
    return res.send(`Hello mr ${req.query.name}`)
})
/*const myServer = http.createServer((req,res)=>{
    console.log("New req rec. ");
    res.end("Hello from Server");
 });
 myServer.listen(8000, ()=> console.log("Server Started"));
 */

 const myServer=http.createServer(app);
 myServer.listen(8000, ()=>console.log("server started"));