const mongoose = require('mongoose');
const { setConfig } = require('./lib/config');
const registrationRouter = require('./router/registrationRouter');
const loginRouter = require('./router/login');
const authenticationMiddleware = require('./middleware/authentication');

const setup = async (options) => {
    if (!options.jwtPrivateKey) {
        throw new Error('jwtPrivateKey is required');
    }
    if (!options.mongoURI) {
        throw new Error('mongoURI is required');
    }

    setConfig({
        jwtPrivateKey: options.jwtPrivateKey,
        adminPassword: options.adminPassword
    });

    await mongoose.connect(options.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Connected to MongoDB via Multiuserauthenticator');
};

module.exports = {
    setup,
    registrationRouter,
    loginRouter,
    authenticationMiddleware
};
