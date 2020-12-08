const {cookie} = require('../config')
const {verifyToken} = require('./jwt')
const {User} = require('../models')

module.exports = (req, res, next) => {
    const token = req.cookies[cookie] || '';
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    if (!token) {
        next()
        return;
    }

    verifyToken(token)
        .then(({_id}) => User.findOne({_id}))
        .then(({username, _id, Role}) => {
            let isAdmin = Role === 'Admin';
            req.user = {username, _id};
            res.locals.isLogged = Boolean(req.user);
            res.locals.isAdmin = isAdmin;
            res.locals.username = username;
            next();
        })
        .catch(next)
};
