const {diffDays} = require("../utils");
const {Vacation} = require('../models');

module.exports = {
    get: {
        all(req, res, next) {
            Vacation
                .find({})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(vacations => {
                    res.status(200)
                    res.send(vacations);
                })
                .catch(next)
        },
        details(req, res, next) {
            Vacation
                .findOne({_id: req.params.id})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(vacation => {
                    res.status(200)
                    res.send(vacation);
                })
                .catch(next)
        },
        update(req, res, next) {
            Vacation
                .findOne({_id: req.params.id})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(vacation => {
                    res.status(200)
                    res.send(vacation);
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            let days = diffDays(from,to)
            Vacation
                .create({description, replacement, from, to, days,createdBy})
                .then(vacation => {
                    res.status(201)
                    res.send(vacation)
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            Vacation
                .updateOne({_id: id}, {description, replacement, from, to, editedBy})
                .then(data => {
                    res.status(201);
                    res.send(data);
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;
            Vacation
                .deleteOne({_id: id})
                .then(() => {
                    res.status(200);
                    res.send(['Delete successfully'])
                })
                .catch(next)
        }
    }
}
