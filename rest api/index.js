const express = require('express');
const mongoose=require('mongoose');
const fs= require('fs');


const app = express();
const port = 8000;

// connect mongoose
mongoose.connect('mongodb://127.0.0.1:27017/ytapp1')
.then(()=> console.log("mongodb connevted"))
.catch((err)=>console.log("Mongo error", err));

const userSchema= new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    jobTitle: {
        type:String,
    },
    gender: {
        type:String,
    }
}, {timestamps: true})

const User =mongoose.model("user", userSchema)
// middelware
app.use(express.urlencoded({extended: false}));
app.use((req,res,next)=>{
    console.log('hello from middleware 1');
    next();
})

app.use((req,res,next)=>{
    console.log(`hello from middleware 2`)
    next();
})





//routes
app.get('/users',async(req,res)=>{
    const allDbUsers= await User.find({});
    const html=`
    <ul>
    
        ${allDbUsers.map((user)=>`<li> ${user.firstName}- ${user.email}</li>`).join("")};
    }
    </ul>
    `
    res.send(html);
})


app.get('/api/users',async (req,res)=>{
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);

})

app.post('/api/users',async  (req,res)=>{
    const body=req.body;
    if(!body || !body.first_name|| !body.email || !body.last_name || !body.gender || !body.job_title){
        return res.status(400).json({
            mssg: "All feilds are required"
        })
    }
    
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title

    })
    console.log(result); 

    return res.status(203).json({mssg : "Success"});
   
   
})



app.route('/api/user/:id')
.get(async (req,res)=>{
    const user = await User.findById(req.params.id);
    
    if(!user){
        return res.status(404).json({
            error: "user not found"
        })
    }
    return res.json(user);
})
.patch(async (req,res)=>{
    const user= await User.findByIdAndUpdate(req.params.id, {})

    return res.json({status : "success"})
})
.delete(async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({status : "success"})
})



app.listen(port, ()=>{console.log(`server started at port : ${port}`)});