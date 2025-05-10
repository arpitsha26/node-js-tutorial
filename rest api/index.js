const express = require('express');
const fs= require('fs');
const users=require('./MOCK_DATA.json');

const app = express();
const port = 8000;
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
app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${
        users.map((user)=>`<li> ${user.first_name}</li>`).join("")
    }
    </ul>
    `
    res.send(html);
})


app.get('/api/users',(req,res)=>{
    return res.json(users);

})

app.post('/api/users',(req,res)=>{
    const body=req.body;
    if(!body || !body.first_name|| !body.email || !body.last_name || !body.gender || !body.job_title){
        return res.status(400).json({
            mssg: "All feilds are required"
        })
    }
    users.push({...body, id: users.length+1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
     return res.status(201).json({status: "ok", 
                       id: users.length
     });
    })
   
})



app.route('/api/user/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find((user)=>user.id==id ) ;
    if(!user){
        return res.status(404).json({
            error: "user not found"
        })
    }
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({status : "pending"})
})
.delete((req,res)=>{
    return res.json({status : "pending"})
})



app.listen(port, ()=>{console.log(`server started at port : ${port}`)});