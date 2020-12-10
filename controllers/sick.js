const {diffDays} = require("../utils");
const {Sick} = require('../models');

module.exports = {
    get: {
        all(req, res, next) {
            Sick
                .find({})
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(sicks => {
                    res.status(200)
                    res.send(sicks);
                })
                .catch(next)
        },
        details(req, res, next) {
            Sick
                .findOne({_id: req.query.id})
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(sick => {
                    res.status(200)
                    res.send(sick);
                })
                .catch(next)
        },
        update(req, res, next) {
            Sick
                .findOne({_id: req.params.id})
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(sick => {
                    res.status(200)
                    res.send(sick);
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            let days = diffDays(from,to)
            Sick
                .create({description, replacement, from, to,days, createdBy})
                .then(sick => {
                    res.status(201)
                    res.send(sick)
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            Sick
                .updateOne({_id: id}, {description, replacement, from, to, editedBy})
                .then(data => {
                    res.status(201);
                    res.send(data);
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;
            Sick
                .deleteOne({_id: id})
                .then(() => {
                    res.status(200);
                    res.send(['Delete successfully'])
                })
                .catch(next)
        }
    }
}
