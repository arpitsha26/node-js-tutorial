const express = require('express');

const{logReqRes}= require("./middlewares");

const userRouter =require('./routes/user');
const { connectMongoDb } = require('./connection');

const app = express();
const port = 8000;

// connect mongoose

connectMongoDb("mongodb://127.0.0.1:27017/ytapp1"); 


// middelware
app.use(express.urlencoded({extended: false}));

app.use(logReqRes("log.txt"));






//routes
app.use("/user", userRouter);



app.listen(port, ()=>{console.log(`server started at port : ${port}`)});