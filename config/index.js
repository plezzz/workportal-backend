const url = require('./secretURL');
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: url || 'mongodb://localhost:27017/WorkPortal',
        origin: ['http://localhost:5555', 'http://localhost:4200'],
        template: 'hbs',
        publicDir: 'public',
        cookie: 'x-auth-token',
        secret: 'SuperSecretSecret',
        saltRounds: 11,
        expire: '1h',
        pricePrecision: 100
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: url || 'mongodb://localhost:27017/WorkPortal',
        origin: ['http://localhost:5555', 'http://localhost:4200'],
        template: 'hbs',
        publicDir: 'public',
        cookie: 'x-auth-token',
        secret: 'SuperSecretSecret',
        saltRounds: 11,
        expire: '1h',
        pricePrecision: 100
    }
};
module.exports = config[env];
