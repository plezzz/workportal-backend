const {diffTime} = require("../utils");
const {HomeOffice, User, Messages} = require('../models');

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
            from = new Date(from)
            to = new Date(to)
            from.setUTCHours(0, 0, 0, 0)
            to.setUTCHours(13, 0, 0, 0)
            from.setDate(from.getDate() + 1);
            to.setDate(to.getDate() + 1);

            let days = diffTime(from, to)
            HomeOffice
                .create({description, replacement, from, to, days, createdBy})
                .then(vacation => {
                    User.findOne({_id: createdBy}).then(user => {
                        Promise.all([
                            User
                                .updateOne({_id: createdBy}, {$push: {VacationDetails: vacation}}),
                            Messages
                                .create({
                                    title: `${user.firstName} ${user.firstName}: Молба за работа от вкъщи.`,
                                    description: `Служител ${user.firstName} ${user.firstName} иска да работи от вкъщи\n 
                от ${from} до ${to}`, createdBy, category: 'homeOffice', eventID: vacation._id
                                }).then(message => {
                                console.log(message)
                                User.updateMany({
                                    isAdmin: true
                                }, {$push: {messageReceived: message}}).then(message => {
                                })
                            })
                        ])
                    })
                    return vacation
                })
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
