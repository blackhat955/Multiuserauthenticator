const mongoose= require('mongoose');
const Joi= require('joi');
const { string } = require('joi');
const User=mongoose.model('User',new mongoose.Schema({
    name:{
        type: String,
        min:3,
        max:30,
        require:true
    },
    email:{
        type:String,
        min:0,
        max:30
    },
    password:String,
    SecurityQuestion:String,
    SecurityAns:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    adminTokenAfterLogin:String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
}));
function validateUser({name,email,password}){
    const schema=Joi.object({
        name:Joi.string().min(5).max(30).required(),
        email:Joi.string().min(0).required(),
        password:Joi.string().min(8).max(20).required()
    });
    return schema.validate({name,email,password});//Joi.validate()
}

module.exports={Customer: User, validateUser};
