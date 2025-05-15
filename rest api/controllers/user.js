const User =require('../models/user')

async function handleGetAllUser(req,res) {
const allDbUsers=await User.find({});
    return res.json(allDbUsers); 
}

async function handleCreateNewUser(req,res){
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
   
   
}


async function handleGetUserByID(req,res){
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({mssg: "User not found"})
    }

     return res.json(user);
}

async function handleUpdateUserByID(req,res){
    const user= await User.findByIdAndUpdate(req.params.id, {})

    return res.json({status : "success"})
}

async function handleDeleteUserByID(req,res){
    const user = await User.findByIdAndDelete(req.params.id);
    return res.json({status : "success"})
}
module.exports={
handleGetAllUser,handleGetUserByID, handleUpdateUserByID, handleDeleteUserByID, handleCreateNewUser

}