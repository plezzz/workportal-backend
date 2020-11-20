const {User} = require('../models');
const {jwt} = require('../utils');
const {cookie} = require('../config');
const {errorLogin} = require('../config/messages')

let templateDir = (doc) => {
    return `./user/${doc}`
};

module.exports = {
    get: {
        login(req, res) {
            res.render(templateDir('login'))
        },
        register(req, res) {
            res.render(templateDir('register'))
        },
        logout(req, res) {
            res
                .clearCookie(cookie)
                .redirect('/login')
        },
        all(req, res, next) {
            User
                .find({})
                .populate('leadTeam', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .populate('VacationDetails')
                .populate('messageReceived')
                .populate('messageSend')
                .populate('listKnowledge')
                .populate('listTerms')
                .lean()
                .then(categories => {
                    res.render('knowledge/all', {categories})
                })
                .catch(next)
        },
        details(req, res, next) {
            User
                .findOne({_id: req.params.id})
                .populate('leadTeam', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .populate('VacationDetails', "-password")
                .populate('messageReceived', "-password")
                .populate('messageSend', "-password")
                .populate('listKnowledge', "-password")
                .populate('listTerms', "-password")
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
            User
                .findOne({_id: req.params.id})
                .populate('leadTeam', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .populate('VacationDetails', "-password")
                .populate('messageReceived', "-password")
                .populate('messageSend', "-password")
                .populate('listKnowledge', "-password")
                .populate('listTerms', "-password")
                .lean()
                .then(category => {
                    res.render('knowledge/update', {category})
                })
                .catch(next)
        },
    },
    post: {
        register(req, res, next) {
            const createdBy = req.user._id

            const {username, email, jobTitle, password, repeatPassword, leadTeam} = {...req.body};
            User.create({username, email, jobTitle, password, repeatPassword, leadTeam})
                .then((user) => {
                    const token = jwt.createToken(user._id);

                    res.cookie(cookie, token, {maxAge: 3600000})
                    res.redirect('/home');
                })
                .catch(next)
        },
        login(req, res, next) {
            const {username, password} = {...req.body};

            User.findOne({username})
                .then((user) => {
                    return Promise.all([
                        user ? user.comparePasswords(password, next) : false,
                        user
                    ])
                })
                .then(([isPasswordMatched, user]) => {
                    if (!isPasswordMatched) {
                        throw new Error(errorLogin.password)
                    }

                    const token = jwt.createToken(user._id);

                    res.cookie(cookie, token, {maxAge: 3600000})
                    res.redirect('/home');
                })
                .catch(next)
        }
    }
}
