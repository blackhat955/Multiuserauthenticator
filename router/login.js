// const mongoose = require('mongoose');
const { getConfig } = require('../lib/config');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const _=require('lodash');
const Bcryptjs=require('bcryptjs');
const auth=require('../middleware/authentication');
const validate=require('../middleware/validateUserBaseOnToken');
const {Customer}=require('../api/userSchema');
const express = require('express');
const crypto = require('crypto');
const limiter = require('../middleware/limiter');
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

router.post('/admin', limiter, auth,validate,async(req, res)=>{
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
const token=jwt.sign({_id:userdb._id,isAdmin:userdb.isAdmin},getConfig().jwtPrivateKey);//use to genrate json web token
userdb.adminTokenAfterLogin=token;

const result=await userdb.save();
return res.send([{"Token_after_Login_Successfully":result,"Login_Information_of_User":values}]);
// return res.send(_.pick(['token']));
});

//Normal user without token who is not admin-------------------------------------------------

router.post('/normal', limiter, async(req, res)=>{
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
    const token=jwt.sign({_id:userdb._id,isAdmin:userdb.isAdmin},getConfig().jwtPrivateKey);//use to genrate json web token
    userdb.adminTokenAfterLogin=token;
    
    const result=await userdb.save();
    return res.send([{"Token_after_Login_Successfully":result,"Login_Information_of_User":values}]);
    // return res.send(_.pick(['token']));
    });

// Request Password Reset
router.post('/request-password-reset', limiter, async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send('Email is required');
    
    const user = await Customer.findOne({ email });
    if (!user) return res.status(400).send('User with this email does not exist');

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // In a real app, we would send an email here.
    // For this library, we return the token so the developer can send the email.
    res.send({
        message: 'Password reset token generated. Please send this token to the user via email.',
        token: token,
        email: email
    });
});

// Reset Password
router.post('/reset-password', limiter, async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).send('Token and newPassword are required');

    const user = await Customer.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).send('Password reset token is invalid or has expired');

    const salt = await Bcryptjs.genSalt(10);
    user.password = await Bcryptjs.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send({ message: 'Password has been reset successfully' });
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
