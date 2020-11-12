const {User} = require('../models');
const titlePage = 'Начало'

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {
                res.render('/home')
            }
            res.render('/login')
        }
    }
};
