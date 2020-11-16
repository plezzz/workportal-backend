const {home, user, error, knowledge, categoryKnowledge} = require('../controllers');
const {checkAuth} = require("../utils");

module.exports = (app) => {


    //Common
    app.get('/', home.get.home)
    app.get('/login', user.get.login)
    app.get('/register', user.get.register)
    app.get('/logout', user.get.logout)
    app.post('/login', user.post.login)
    app.post('/register', user.post.register)

    //Category Knowledge
    app.get('/categoryKnowledge/', checkAuth(true), categoryKnowledge.get.all)
    app.get('/categoryKnowledge/:id', checkAuth(true), categoryKnowledge.get.details)
    app.get('/categoryKnowledge/create', checkAuth(true), categoryKnowledge.get.create)
    app.get('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.get.update)
    app.post('/categoryKnowledge/create', checkAuth(true), categoryKnowledge.post.create)
    app.post('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.post.update)
    app.post('/categoryKnowledge/delete/:id', checkAuth(true), categoryKnowledge.post.delete)

    //Knowledge
    app.get('/knowledge/', checkAuth(true), knowledge.get.all)
    app.get('/knowledge/:id', checkAuth(true), knowledge.get.details)
    app.get('/knowledge/create', checkAuth(true), knowledge.get.create)
    app.get('/knowledge/update/:id', checkAuth(true), knowledge.get.update)
   app.post('/knowledge/create', checkAuth(true), knowledge.post.create)
    app.post('/knowledge/update/:id', checkAuth(true), knowledge.post.update)
   app.post('/knowledge/delete/:id', checkAuth(true), knowledge.post.delete)


    //Category Therm
    // app.get('/categoryTherm/',checkAuth(true),categoryTherm.get.all)
    // app.get('/categoryTherm/:id',checkAuth(true),categoryTherm.get.one)
    // app.get('/categoryTherm/create',checkAuth(true),categoryTherm.get.create)
    // app.get('/categoryTherm/update/:id',checkAuth(true),categoryTherm.get.update)
    // app.post('/categoryTherm/create',checkAuth(true),categoryTherm.post.create)
    // app.post('/categoryTherm/update/:id',checkAuth(true),categoryTherm.post.update)
    // app.post('/categoryTherm/delete/:id',checkAuth(true),categoryTherm.post.delete)

    //Error
    app.get('*', error.get.displayError)
}
