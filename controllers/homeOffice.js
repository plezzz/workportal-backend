const {HomeOffice} = require('../models');

module.exports = {
    get: {
        all(req, res, next) {
            HomeOffice
                .find({})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(homeOffices => {
                    res.status(200)
                    res.send(homeOffices);
                })
                .catch(next)
        },
        details(req, res, next) {
            HomeOffice
                .findOne({_id: req.params.id})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(homeOffice => {
                    res.status(200)
                    res.send(homeOffice);
                })
                .catch(next)
        },
        update(req, res, next) {
            HomeOffice
                .findOne({_id: req.params.id})
                .populate('approvedByLead', "-password")
                .populate('approvedByAdmin', "-password")
                .populate('replacement', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .lean()
                .then(homeOffice => {
                    res.status(200)
                    res.send(homeOffice);
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            HomeOffice
                .create({description, replacement, from, to, createdBy})
                .then(homeOffice => {
                    res.status(201)
                    res.send(homeOffice)
                })
                .catch(next)
        },
        update(req, res, next) {
            const id = req.params.id;
            const editedBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            HomeOffice
                .updateOne({_id: id}, {description, replacement, from, to, editedBy})
                .then(data => {
                    res.status(201);
                    res.send(data);
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;
            HomeOffice
                .deleteOne({_id: id})
                .then(() => {
                    res.status(200);
                    res.send(['Delete successfully'])
                })
                .catch(next)
        }
    }
}
