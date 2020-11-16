const {User} = require('../models')
module.exports = function checkAuth(shouldBeAuthenticated, shouldBeAuthorized=false) {
    return function (req, res, next) {
        const isNotAuthWhenAuthIsRequired =
            shouldBeAuthenticated && !req.user;
        if (
            (isNotAuthWhenAuthIsRequired) ||
            (!shouldBeAuthenticated && req.user)
        ) {
            res.redirect(isNotAuthWhenAuthIsRequired ? '/login' : '/');
            return;
        }
        if (shouldBeAuthorized) {
            User
                .findOne({_id: req.user._id})
                .then(user=> {
                  if (user.Role !== 'Admin'){
                      next('Is not allowed')
                  }
            })
        }
        next();
    };
};
