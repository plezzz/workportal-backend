const {Role} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            Role
                .find({isDisabled: false})
                .lean()
                .then(roles => {
                    res.send(roles)
                })
                .catch(next)
        },
        details(req, res, next) {
            Role
                .findOne({_id: req.params.id})
                .lean()
                .then(role => {
                    res.send(role)
                })
                .catch(next)
        },
        update(req, res, next) {
            Role
                .findOne({_id: req.params.id})
                .lean()
                .then(category => {
                    res.render('knowledge/update', {category})
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            console.log(req.body);
            const createdBy = req.user._id || '5fafb2511c1b7b10bc09b191';
            let {title, color, description} = req.body;

            Role
                .create({title, color, description, createdBy})
                .then(tag => {
                    res.status(200);
                    res.send(tag)
                    //res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, color, description, completed} = req.body;
            Role
                .updateOne({_id: id}, {title, color, description, completed, editedBy},
                    {runValidators: true}, function (err) {
                        if (err) {
                            if (err.code === 11000) {
                                next(errorCommon.alreadyInUseObj('CategoryKnowledge', 'title'));
                            }
                        }
                    }
                )
                .then(data => {
                    res.status(204);
                    res.send(data);
                })
                .catch(next)
        }
        ,
        delete(req, res, next) {
            const id = req.params.id;

            Role
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
};
