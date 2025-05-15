const express = require('express');

const{logReqRes}= require("./middlewares");

const userRouter =require('./routes/user');
const { connectMongoDb } = require('./connection');

const app = express();
const port = 8000;

// connect mongoose

connectMongoDb("mongodb://127.0.0.1:27017/ytapp1").then(()=>{console.log("Mongodb Connected!")}); 


// middelware
app.use(express.urlencoded({extended: false}));

app.use(logReqRes("log.txt"));






//routes
app.use("/api/users", userRouter);



app.listen(port, ()=>{console.log(`server started at port : ${port}`)});