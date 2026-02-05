const express = require('express');
const Bcryptjs=require('bcryptjs');
const {Customer,validateUser}=require('../api/userSchema');
const auth=require('../middleware/authentication');
const validate=require('../middleware/validateUserBaseOnToken');
const admin=require('../middleware/admin');
const _=require('lodash');
const jwt=require('jsonwebtoken');
const { getConfig } = require('../lib/config');
const limiter = require('../middleware/limiter');
const router=express.Router();

router.get('/:id',async(req,res)=>{
    const customer=await Customer.findById(req.params.id).select(['-password','-securans','-isAdmin','-adminTokenAfterLogin','-SecurityAns']);
     return res.send(customer);
}); 

router.get('/',async(req,res)=>{
    const customer=await Customer.find().select(['-password','-securans','-isAdmin','-adminTokenAfterLogin','-SecurityAns']);
     return res.send(customer);
});

//this is protect only admin with valid password will register

router.post('/admin', limiter, admin,async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error) return res.status(400).send('Value enter by you may be not valid try again......');
    let userInfo=await Customer.findOne({email:req.body.email});
    if(userInfo)return res.status(400).send('user is register with this email is alrady exist');
    const customer=new Customer({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        SecurityQuestion:req.body.securque,
        SecurityAns:req.body.securans,
        isAdmin:req.body.isAdmin
    });
    const passwordSend=customer.password;
    const salt=await Bcryptjs.genSalt(10);
    customer.password=await Bcryptjs.hash( customer.password,salt);
    customer.SecurityQuestion=await Bcryptjs.hash( customer.SecurityQuestion,salt);
    customer.SecurityAns=await Bcryptjs.hash( customer.SecurityAns,salt);
    const token=jwt.sign({_id:customer._id,email:customer.email,password:passwordSend,isAdmin:customer.isAdmin},getConfig().jwtPrivateKey);
    // customer.Token=token;
    let value=`You are successfully register As admin and Boolean Result is:${customer.isAdmin}`
    const result=await customer.save();
    return res.header('x-auth-validation',token).send({"isAdmin":value,"Information":_.pick(result,['_id','name','email','password'])});
    // res.send(result);
})

// register as without admin password you are now normal user and with limited access

router.post('/normal', limiter, async(req,res)=>{
    const {error}=validateUser(req.body);
    if(error) return res.status(400).send('Value enter by you may be not valid try again......');
    let userInfo=await Customer.findOne({email:req.body.email});
    if(userInfo)return res.status(400).send('user is register with this email is alrady exist');
    const customer=new Customer({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        SecurityQuestion:req.body.securque,
        SecurityAns:req.body.securans,
    });
    const passwordSend=customer.password;
    const salt=await Bcryptjs.genSalt(10);
    customer.password=await Bcryptjs.hash( customer.password,salt);
    customer.SecurityQuestion=await Bcryptjs.hash( customer.SecurityQuestion,salt);
    customer.SecurityAns=await Bcryptjs.hash( customer.SecurityAns,salt);
    const token=jwt.sign({_id:customer._id,email:customer.email,password:passwordSend},getConfig().jwtPrivateKey);
    // customer.Token=token;
    let value=`You are successfully register As normal User and Boolean Result is:${customer.isAdmin}`
    const result=await customer.save();
    return res.header('x-auth-validation',token).send({"isAdmin":value,"Information":_.pick(result,['_id','name','email','password'])});
    // res.send(result);
});




//Update Information only admin can modify it--here admin try to revoke privilege 

router.put('/',[auth,validate],async(req,res)=>{
    const customer=await Customer.findByIdAndUpdate(req.body.id,{
        isAdmin:req.body.isAdmin
    },{new:true});
    const customerInformationUpdated=await customer.save();
    return res.send({
        "User":customerInformationUpdated,
        "Info":`For user with id:${req.params.id} privilege change Successfully Now his access limited`
    });
})

//delete is also  done by user only-------------------------------

router.delete('/:id',[auth,validate],async(req,res)=>{
    const customer=await Customer.findByIdAndRemove(req.params.id);
    return res.send({
        "User":customer,
        "Info":`The user with id:${req.params.id} is Deleted Successfully`
    });
})




module.exports=router;
