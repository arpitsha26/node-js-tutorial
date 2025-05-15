const express = require('express');
const router = express.Router();

const {handleGetAllUser}=require('../controllers/user')
const {handleCreateNewUser}=require('../controllers/user')
const {handleGetUserByID}=require('../controllers/user')
const {handleUpdateUserByID}=require('../controllers/user')
const {handleDeleteUserByID}=require('../controllers/user')


router.route("/")
.get(handleGetAllUser).post(handleCreateNewUser);


router.route("/:id")
.get(handleGetUserByID)
.patch(handleUpdateUserByID)
.delete(handleDeleteUserByID);

module.exports=router;