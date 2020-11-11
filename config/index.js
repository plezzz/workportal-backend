const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb+srv://plezzz:vzSYTTms8vsIfuCD@cluster0.sfqdk.mongodb.net/workPortal?retryWrites=true&w=majority',
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
