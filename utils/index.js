const jwt = require('./jwt');
const auth = require('./auth');
const checkAuth = require('./check-auth')
const loginValidator = require('./login-validator')
const tagsCheck = require('./tags-check')
const holiday = require('./holydays')
const diffTime = require('./diffDays')
const mHoliday = require('./momentBulgariaHolidays')

module.exports = {
    jwt,
    auth,
    checkAuth,
    loginValidator,
    tagsCheck,
    holiday,
    diffTime,
    mHoliday
}
