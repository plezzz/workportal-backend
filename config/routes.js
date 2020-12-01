const {home, user, error, knowledge, categoryKnowledge, categoryTerm, tag, job, vacation, message,role} = require('../controllers');
const {checkAuth} = require("../utils");

module.exports = (app) => {

    //Common
    app.get('/', home.get.home)
    app.get('/login', user.get.login)
    app.get('/register', user.get.register)
    app.get('/logout', user.get.logout)
    app.get('/user/all', user.get.all)
    app.post('/login', user.post.login)
    app.post('/register', user.post.register)
    app.post('/logout', user.post.logout)

    //Category Knowledge
    app.get('/categoryKnowledge', checkAuth(true), categoryKnowledge.get.all)
    app.get('/categoryKnowledge/:id', checkAuth(true), categoryKnowledge.get.details)
    app.get('/categoryKnowledge/create', checkAuth(true), categoryKnowledge.get.create)
    app.get('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.get.update)
    app.post('/categoryKnowledge/create', checkAuth(true), categoryKnowledge.post.create)
    app.post('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.post.update)
    app.post('/categoryKnowledge/delete/:id', checkAuth(true), categoryKnowledge.post.delete)

    //Knowledge
    app.get('/knowledge', checkAuth(true), knowledge.get.all)
    app.get('/knowledge/:id', checkAuth(true), knowledge.get.details)
    app.get('/knowledge/create', checkAuth(true), knowledge.get.create)
    app.get('/knowledge/update/:id', checkAuth(true), knowledge.get.update)
    app.post('/knowledge/create', checkAuth(true), knowledge.post.create)
    app.post('/knowledge/update/:id', checkAuth(true), knowledge.post.update)
    app.post('/knowledge/delete/:id', checkAuth(true), knowledge.post.delete)


    //Category Therm
    app.get('/categoryTherm', checkAuth(true), categoryTerm.get.all)
    app.get('/categoryTherm/:id', checkAuth(true), categoryTerm.get.details)
    app.get('/categoryTherm/create', checkAuth(true), categoryTerm.get.create)
    app.get('/categoryTherm/update/:id', checkAuth(true), categoryTerm.get.update)
    app.post('/categoryTherm/create', checkAuth(true), categoryTerm.post.create)
    app.post('/categoryTherm/update/:id', checkAuth(true), categoryTerm.post.update)
    app.post('/categoryTherm/delete/:id', checkAuth(true), categoryTerm.post.delete)

    //Tag
    app.get('/tag', checkAuth(true), tag.get.all)
    app.get('/tag/:id', checkAuth(true), tag.get.details)
    app.get('/tag/create', checkAuth(true), tag.get.create)
    app.get('/tag/update/:id', checkAuth(true), tag.get.update)
    app.post('/tag/create', checkAuth(true), tag.post.create)
    app.post('/tag/update/:id', checkAuth(true), tag.post.update)
    app.post('/tag/delete/:id', checkAuth(true), tag.post.delete)

    //Job
    app.get('/job', job.get.all)
    app.get('/job/:id', checkAuth(true), job.get.details)
    app.get('/job/create', checkAuth(true), job.get.create)
    app.get('/job/update/:id', checkAuth(true), job.get.update)
    app.post('/job/create', checkAuth(true), job.post.create)
    app.post('/job/update/:id', checkAuth(true), job.post.update)
    app.post('/job/delete/:id', checkAuth(true), job.post.delete)

    //Message
    app.get('/message', checkAuth(true), message.get.all)
    app.get('/message/:id', checkAuth(true), message.get.details)
    app.get('/message/create', checkAuth(true), message.get.create)
    app.post('/message/create', checkAuth(true), message.post.create)
    app.post('/message/delete/:id', checkAuth(true), message.post.delete)

    //Vacation
    app.get('/vacation', checkAuth(true), vacation.get.all)
    app.get('/vacation/:id', checkAuth(true), vacation.get.details)
    app.get('/vacation/create', checkAuth(true), vacation.get.create)
    app.get('/vacation/update/:id', checkAuth(true), vacation.get.update)
    app.post('/vacation/create', checkAuth(true), vacation.post.create)
    app.post('/vacation/update/:id', checkAuth(true), vacation.post.update)
    app.post('/vacation/delete/:id', checkAuth(true), vacation.post.delete)

    //Role
    app.get('/role', role.get.all)
    app.get('/role/:id', checkAuth(true), role.get.details)
    app.get('/role/create', checkAuth(true), role.get.create)
    app.get('/role/update/:id', checkAuth(true), role.get.update)
    app.post('/role/create', checkAuth(true), role.post.create)
    app.post('/role/update/:id', checkAuth(true), role.post.update)
    app.post('/role/delete/:id', checkAuth(true), role.post.delete)

    //Error
    app.get('*', error.get.displayError)
}
