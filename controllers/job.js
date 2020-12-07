const {Job} = require('../models');
const {errorCommon} = require('../config/messages');

module.exports = {
    get: {
        all(req, res, next) {
            Job
                .find({isDisabled: false})
                .lean()
                .then(jobs => {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200)
                    res.send(jobs);
                })
                .catch(next)
        },
        details(req, res, next) {
            Job
                .findOne({_id: req.params.id})
                .populate('createdBy', "-password")
                .populate('lead', "-password")
                .lean()
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
        update(req, res, next) {
            Job
                .findOne({_id: req.params.id})
                .populate('createdBy', "-password")
                .populate('lead', "-password")
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
            let {title, lead} = req.body;

            Job
                .create({title,lead,createdBy})
                .then(tag => {
                    res.send(tag)
                    //res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {title, lead}  = req.body;
            Job
                .updateOne({_id: id}, {title,lead, editedBy},
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

            Job
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
}
