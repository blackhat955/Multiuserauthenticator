// const config = require('config');
const mongoose=require('mongoose');
const Joi=require('joi');
const user=new mongoose.Schema({
    name:{
        type:String,
        min:5,
        max:50,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true,
        max:255
    },
    password:{
        type:String,
        require:true,
        min:8,
        max:1024
    },
    isAdmin:Boolean
});
// method add in that schema  
// user.methods.getUserToken=fuction(){  //these type fuction called stand alone fuction //now getUserToken is fuction of the user
//     const token=jwt.sign({_id:user._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
//     return token;
// }
const User=mongoose.model('User',user);

function validateUserEndPoint({name,email,password}){
const schema=Joi.object({
    name:Joi.string().max(50).min(5).required(),
    email:Joi.string().max(255).required().email(),
    password:Joi.string().max(1024).required()
});
return schema.validate({name,email,password});

}
module.exports={user,User,validateUserEndPoint};