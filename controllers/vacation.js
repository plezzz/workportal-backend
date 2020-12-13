const {diffTime, mHoliday} = require("../utils");
const {Vacation, User, Messages} = require('../models');
const momentBDays = require('moment-business-days');
const moment = require('moment-holiday');

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
            from = new Date(from)
            to = new Date(to)
            from.setUTCHours(0, 0, 0, 0)
            to.setUTCHours(13, 0, 0, 0)
            from.setDate(from.getDate() + 1);
            to.setDate(to.getDate() + 1);

            let days = diffTime(from, to)
            moment.modifyHolidays.set(mHoliday);
            let holidays = moment(from).holidaysBetween(to);
            if (holidays) {
                holidays.forEach((d) => {
                    if (d.day() === 6 || d.day() === 7) {
                        d.nextBusinessDay()
                        let title = "Почивен понеделник заради" + d.isHoliday();
                        moment.modifyHolidays.add({
                            title: {
                                date: `${d.month() + 1}/${d.date()}`,
                            }
                        });
                    }
                })
            }
            let workDays = moment(to, 'YYYY-MM-DD').businessDiff(moment(from, 'YYYY-MM-DD'));
            Vacation
                .create({description, replacement, from, to, days, workDays, createdBy})
                .then(vacation => {
                    User.findOne({_id: createdBy}).then(user => {
                        Promise.all([
                            User
                                .updateOne({_id: createdBy}, {$push: {VacationDetails: vacation}}),
                            Messages
                                .create({
                                    title: `${user.firstName} ${user.firstName}: Молба за отпуск`,
                                   description: `Служител ${user.firstName} ${user.firstName} иска да бъде в отпуск\n 
                от ${from} до ${to}`, createdBy, category: 'vacation', eventID: vacation._id
                                }).then(message => {
                                User.updateMany({
                                    jobTitle: user.jobTitle,
                                    isLead: true
                                }, {$push: {messageReceived: message}}).then(message => {
                                })
                            })
                        ])
                    })
                    return vacation
                })
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
