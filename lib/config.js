let configuration = {
    jwtPrivateKey: null,
    adminPassword: null
};

function setConfig(config) {
    configuration = { ...configuration, ...config };
}

function getConfig() {
    if (!configuration.jwtPrivateKey) {
        throw new Error('JWT Private Key is not set. Please call setup() with jwtPrivateKey.');
    }
    // adminPassword might be optional depending on usage, but strictly it is used in admin middleware
    return configuration;
}

module.exports = { setConfig, getConfig };
