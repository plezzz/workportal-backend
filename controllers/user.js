const {User} = require('../models');
const {jwt} = require('../utils');
const {cookie} = require('../config');
const {errorLogin} = require('../config/messages');

module.exports = {
    get: {
        logout(req, res) {
            res.clearCookie(cookie)
            res.send({message: 'logged out'})
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
                .populate({
                    path: 'listKnowledge',
                    populate: {
                        path: 'tags'
                    }
                })
                .populate('listTerms')
                .populate('tags')
                .lean()
                .then(users => {
                    res.send(users)
                })
                .catch(next)
        },
        allQuery(req, res, next) {
            let query = req.query;
            query={...query,isDisabled:false}
            const user = req.user;
            console.log('user:',user)
            console.log('query:',query)
            User
                .find(query)
                .lean()
                .then(users => {
                    res.send(users)
                })
                .catch(next)
        },
        user(req, res, next) {
            User
                .findOne({_id: req.params.id})
                .populate('jobTitle')
                .lean()
                .then(user => {
                    res.status(200)
                    res.send(user)
                    //res.json(user)
                })
                .catch(next)
        },
        details(req, res, next) {
            console.log('Check user id:', req.user._id)
            User
                .findOne({_id: req.user._id})
                .populate('leadTeam', "-password")
                .populate('createdBy', "-password")
                .populate('editedBy', "-password")
                .populate('VacationDetails', "-password")
                .populate({
                    path : 'messageReceived',
                    populate : {
                        path : 'createdBy'
                    }
                })
                .populate('messageSend', "-password")
                .populate('listKnowledge', "-password")
                .populate('listTerms', "-password")
                .lean()
                .then(user => {
                    res.status(200)
                    res.send(user)
                    //res.json(user)
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.id;
            console.log(id)
            User
                .deleteOne({_id: id})
                .then(() => {
                    res.status(200)
                    res.send({message: 'Successfully deleted user'})
                })
                .catch(next)
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
            const createdBy = req.user._id;
            console.log('here')
            console.log('createdBy', createdBy)
            const {
                username,
                email,
                jobTitle,
                password,
                repeatPassword,
                leadTeam,
                firstName,
                lastName,
                isSupport,
                isAdmin,
                isLead
            } = {...req.body};
            User
                .create({
                    username,
                    email,
                    jobTitle,
                    password,
                    repeatPassword,
                    leadTeam,
                    createdBy,
                    firstName,
                    lastName,
                    isSupport,
                    isAdmin,
                    isLead
                },)
                .then((user) => {
                    res.status(201)
                    res.send({message:'Потребителя е създаден.',user:user})
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
                   //  let now = new Date();
                   // now.setTime(3600)
                   //  console.log(now.getTime)
                    const token = jwt.createToken(user._id);
                    // console.log(now)
                    res.clearCookie()
                    res.cookie(cookie, token, {httpOnly: true, maxAge: 1.728e+9,sameSite: "lax"});
                    res.header(cookie, token)
                    res.send(user)
                })
                .catch(next)
        },
        logout(req, res) {
            res.clearCookie(cookie)
            res.send({message: 'logged out'})
        }
    }
};
