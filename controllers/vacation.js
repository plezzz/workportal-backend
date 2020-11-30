const {Vacation} = require('../models');
//const {errorCommon} = require('../config/messages');

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
                .then(categories => {
                    res.render('knowledge/all', {categories})
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
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
        create(req, res) {
            res.render('knowledge/create')
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
                .then(category => {
                    res.render('knowledge/update', {category})
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {description, replacement, from, to} = req.body;
            Vacation
                .create({description, replacement, from, to, createdBy})
                .then(vacation => {
                    res.send(vacation)
                    //res.redirect('/')
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
                    res.status(204);
                    res.send(data);
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;

            Vacation
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
}
