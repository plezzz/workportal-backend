const {Message, User} = require('../models');

module.exports = {
    get: {
        all(req, res, next) {
            Message
                .find({isDisabled: false})
                .populate('createdBy', "-password")
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            Message
                .findOne({_id: req.params.id})
                .populate('createdBy', "-password")
                .lean()
                .then(category => {
                    res.render('knowledge/details', {category})
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {title, description, receiver} = req.body;

            Message
                .create({title, description, receiver, createdBy})
                .then(message => {
                    User.updateOne({_id: createdBy}, {$push: {messageSent: message._id}})
                    User.updateOne({_id: receiver}, {$push: {messageReceived: message._id}})
                    return message
                })
                .then(message => {
                    res.send(message)
                    //res.redirect('/')
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;
            Message
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        }
    }
}
