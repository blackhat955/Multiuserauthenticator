const { getConfig } = require('../lib/config');

module.exports = function admin(req, res, next) {
    const adminPasswordFromHeader = req.header('admin');
    if (!adminPasswordFromHeader) return res.status(403).send('Invalid_User_You_are _not Authenticate to _register as admin.Access Denied!!!.......');
    try {
        const config = getConfig();
        // console.log(config.adminPassword);
        if (adminPasswordFromHeader === config.adminPassword) {
            // console.log("iam here  tovery as admin"); 
            next();
        } else {
            return res.status(400).send('Invalid password for register as Admin.Access Denied.............');
        }
    }
    catch (ex) {
        return res.status(400).send('Invalid password for register as Admin.Access Denied.............');
    }
}
