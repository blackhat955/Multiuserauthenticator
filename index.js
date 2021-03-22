const mongoose=require('mongoose');
const express=require('express');
const winston=require('winston');
const register=require('./router/registrationRouter'); 
const login=require('./router/login')
const config=require('config');
const app=express();
app.use(express.json())
mongoose.connect('mongodb://localhost/Intership_task_project',{useNewUrlParser:true,
useUnifiedTopology:true,
useFindAndModify:false
})
 .then(()=>console.log('conneted to database'))
 .catch(err=>console.log("can't not connected"));
 if(!config.get('internshiprProjectPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey is missing');
    process.exit(1);
}
app.use('/api/register',register);
app.use('/api/login',login);
winston.handleExceptions( 
new winston.transports.Console({colorize:true,prettyPrint:true,level:'info'}),
new winston.transports.File({filename:'uncaughtException'}),
new winston.transports.File({filename:'error.log',level:'info'}));

process.on('unhandledRejection',(ex)=>{
throw ex;
});

 const port=process.env.PORT||3000;
 app.listen(port,()=>console.log(`listen on port no ${port}`));