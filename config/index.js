const env = process.env.NODE_ENV || 'development';
let secretURL;
if (env === 'production') {
         secretURL = process.env.secretDBURL
}else{
         secretURL = require('./secretURL2');
}

config =
     {
        port: process.env.PORT || 3000,
        dbURL: secretURL || 'mongodb://localhost:27017/WorkPortal',
        origin: ['http://localhost:5555', 'http://localhost:4200'],
        template: 'hbs',
        publicDir: 'public',
        cookie: 'x-auth-token',
        secret: 'SuperSecretSecret',
        saltRounds: 11,
        expire: '1h',
        pricePrecision: 100
    }

module.exports = config;
