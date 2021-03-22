const jwt=require('jsonwebtoken');
const config = require('config');
function auth(req,res,next){
    const token=req.header('x-auth-validation');
    if(!token)return res.status(401).send('Invalid_User_try_to_access.Access Denied!!!.......');
    try{
        const decoder=jwt.verify(token,config.get('internshiprProjectPrivateKey'));

        console.log("iam here")
        req.user=decoder; 
      next();
    }
    catch(ex){
        return res.status(400).send('Invalid token.Access Denied.............');
    }
}

module.exports=auth;