const config = require('config');
module.exports=function admin(req,res,next){
    
    const adminPasswordFromHeader=req.header('admin');
    if(!adminPasswordFromHeader)return res.status(403).send('Invalid_User_You_are _not Authenticate to _register as admin.Access Denied!!!.......');
    try{
        console.log(config.get('adminPassword'));
        if(adminPasswordFromHeader===config.get('adminPassword')){
            // console.log("iam here  tovery as admin"); 
            next();
        }
    }
    catch(ex){
        return res.status(400).send('Invalid password for register as  Admin.Access Denied.............');
    }


}