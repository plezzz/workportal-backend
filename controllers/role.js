const {Role} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            Role
                .find({isDisabled: false})
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            Role
                .findOne({_id: req.params.id})
                .lean()
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
        create(req, res) {
            res.render('knowledge/create')
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
            const createdBy = req.user._id;
            let {title} = req.body;

            Role
                .create({title,createdBy})
                .then(tag => {
                    res.send(tag)
                    //res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title}  = req.body;
            Role
                .updateOne({_id: id}, {title, editedBy},
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
}
