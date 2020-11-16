const jwt = require('./jwt');
const auth = require('./auth');
const checkAuth = require('./check-auth')
const loginValidator = require('./login-validator')
const tagsCheck = require('./tags-check')

module.exports = {
    jwt,
    auth,
    checkAuth,
    loginValidator,
    tagsCheck
}
