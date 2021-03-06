// const mongoose = require('mongoose');
const config = require('config');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const _=require('lodash');
const Bcryptjs=require('bcryptjs');
const auth=require('../middleware/authentication');
const validate=require('../middleware/validateUserBaseOnToken');
const {Customer}=require('../api/userSchema');
const express = require('express');
// const { values } = require('lodash');
const router=express.Router();


//without varification or token you Can't get whole info about User

router.get('/:_id',auth,validate,async(req,res)=>{
    const userInfo=await Customer.findById(req.params._id);
    return res.send({
    "UserINfo":userInfo,
    "UnhashPasswod":req.user.password
    });
});

//Admin as User try to log in no need to given the input in body only token needed-----------------------------------------------------------------

router.post('/admin',auth,validate,async(req, res)=>{
const{error}=validateUserasAuth(req.user);
if(error)return res.status(400).send('Not enter the valid email/Id');
const userdb=await Customer.findOne({_id:req.user._id});
// console.log(userdb)
if(!userdb)return res.status(400).send('Invalid_User');
const auth=await Bcryptjs.compare(req.user.password,userdb.password);
if(!auth)return res.status(400).send('email or password is worng ');
//genrating token and put the jwt.sign in diifrent module  
//the arrow fuction does not have t6his keyword .
const values=`--------------You log in successfully As Admin 
  Email_ID:${req.user.email} and Password:${req.user.password}---------------`;
const token=jwt.sign({_id:userdb._id,isAdmin:userdb.isAdmin},config.get('internshiprProjectPrivateKey'));//use to genrate json web token
userdb.adminTokenAfterLogin=token;

const result=await userdb.save();
return res.send([{"Token_after_Login_Successfully":result,"Login_Information_of_User":values}]);
// return res.send(_.pick(['token']));
});

//Normal user without token who is not admin-------------------------------------------------

router.post('/normal',async(req, res)=>{
    const{error}=validateUserasAuth(req.body);
    if(error)return res.status(400).send('Not enter the valid email/Id');
    const userdb=await Customer.findOne({_id:req.body._id});
    // console.log(userdb)
    if(!userdb)return res.status(400).send('Invalid_User');
    const auth=await Bcryptjs.compare(req.body.password,userdb.password);
    if(!auth)return res.status(400).send('email or password is worng ');
    //genrating token and put the jwt.sign in diifrent module  
    //the arrow fuction does not have t6his keyword .
    const values=`--------------You log in successfully you privilege is limited for 
      Email_ID:${req.body.email} and Password:${req.body.password}---------------`;
    const token=jwt.sign({_id:userdb._id,isAdmin:userdb.isAdmin},config.get('internshiprProjectPrivateKey'));//use to genrate json web token
    userdb.adminTokenAfterLogin=token;
    
    const result=await userdb.save();
    return res.send([{"Token_after_Login_Successfully":result,"Login_Information_of_User":values}]);
    // return res.send(_.pick(['token']));
    });

// forget password by normal user-------------------------------------------------------------------

router.post('/forgetPassword',async(req, res)=>{
    const{error}=validateUserasAuth(req.body);
    if(error)return res.status(400).send('Not enter the valid emailId or password type');
    const userdb=await Customer.findOne({email:req.body.email});
    if(!userdb)return res.status(400).send('Invalid_User');
    const salt=await Bcryptjs.genSalt(10);
    userdb.password=await Bcryptjs.hash( req.body.password,salt);
    
    //genrating token and put the jwt.sign in diifrent module  
    //the arrow fuction does not have t6his keyword .
    const values=`--------------You Update you password successfuly 
      Email_ID:${req.body.email} and Password:${req.body.password}---------------`;
    
    const result=await userdb.save();
    return res.send({"Rsult":values,"updateInfo":_.pick(result,['_id','password'])});
    // return res.send(_.pick(['token']));
    });




function validateUserasAuth({email,password}){
    const schema=Joi.object({
        email:Joi.string().max(255).required().email(),
        password:Joi.string().max(255).required()
    });
    return schema.validate({email,password});
}
//get request data as admin that include the password of user as well for as Admin

module.exports=router;