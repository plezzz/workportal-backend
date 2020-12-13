const {User, Messages} = require('../models');

module.exports = {
    get: {
        all(req, res, next) {
            Messages
                .find({isDisabled: false})
                .populate('createdBy', "-password")
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },

        details(req, res, next) {
            //Messages.updateMany( {}, { eventID: "5fd48e8467b841159cfc87a5" }  ).then(categories =>{console.log(categories)})
            Messages
                .findOne({_id: req.params.id})
                .lean()
                .then(message => {
                    res.status(200)
                    res.send(message)
                })
                .catch(next)
        },
    },

    post: {
        create: async function (req, res, next) {
            const createdBy = req.user._id;
            let {title, description, receiver} = req.body;

            Messages
                .create({title, description, receiver, createdBy})
                .then(message => {
                    User.updateOne({_id: createdBy}, {$push: {messageSent: message._id}})
                    User.updateOne({_id: receiver}, {$push: {messageReceived: message._id}})
                    return message
                })
                .then(message => {
                    res.send(message)
                })
                .catch(next)
        },
        delete(req, res, next) {
            const id = req.params.id;
            Messages
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        update(req, res, next) {
            console.log(req.params.id)
            Messages
                .findOneAndUpdate({_id: req.params.id}, {isRead: true})
                .then(() => {
                    res.status(200)
                    res.send({message: 'message is read'})
                })
                .catch(next)
        },
        getAll(req, res, next) {
            let {ids,isRead} = req.body;
            Messages
                .find(
                    {_id: {$in: ids}, isRead: isRead})
                .populate('createdBy')
                .then(messages => {
                    console.log(messages)
                    res.status(200)
                    res.send(messages)
                })
                .catch(next)
        },
    }
}
