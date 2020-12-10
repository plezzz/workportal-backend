const jwt = require('./jwt');
const auth = require('./auth');
const checkAuth = require('./check-auth')
const loginValidator = require('./login-validator')
const tagsCheck = require('./tags-check')
const holiday = require('./holydays')
const diffDays = require('./diffDays')

module.exports = {
    jwt,
    auth,
    checkAuth,
    loginValidator,
    tagsCheck,
    holiday,
    diffDays
}
