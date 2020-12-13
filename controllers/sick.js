const momentBDays = require('moment-business-days');
const moment = require('moment-holiday');
const {diffTime, mHoliday} = require("../utils");
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
             from = new Date(from)
             to = new Date(to)
            from.setUTCHours(0,0,0,0)
            to.setUTCHours(13,0,0,0)
            from.setDate(from.getDate()+1);
            to.setDate(to.getDate()+1);

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
            console.log(days)
           // console.log(workDays)
            Sick
                .create({description, replacement, from, to, days,workDays, createdBy})
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
