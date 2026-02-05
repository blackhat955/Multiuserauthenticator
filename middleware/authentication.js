const jwt = require('jsonwebtoken');
const { getConfig } = require('../lib/config');

function auth(req, res, next) {
    const token = req.header('x-auth-validation');
    if (!token) return res.status(401).send('Invalid_User_try_to_access.Access Denied!!!.......');
    try {
        const config = getConfig();
        const decoder = jwt.verify(token, config.jwtPrivateKey);

        // console.log("iam here")
        req.user = decoder;
        next();
    }
    catch (ex) {
        return res.status(400).send('Invalid token.Access Denied.............');
    }
}

module.exports = auth;
