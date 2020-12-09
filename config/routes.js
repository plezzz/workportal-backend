const {
    home,
    user,
    error,
    knowledge,
    categoryKnowledge,
    categoryTerm,
    tag,
    job,
    vacation,
    message,
    role,
    sick,
    homeOffice,
    holidays
} = require('../controllers');
const {checkAuth} = require("../utils");

module.exports = (app) => {

    //Common
    app.get('/', home.get.home)
    app.get('/logout', user.get.logout)
    app.post('/login', user.post.login)
    app.post('/register', user.post.register)
    app.post('/logout', user.post.logout)

    // User
    app.get('/user/all', user.get.all)
    app.get('/user/details', user.get.details)
    app.get('/user/allUsersQuery', user.get.allQuery)

    //Category Knowledge
    app.get('/categoryKnowledge', checkAuth(true), categoryKnowledge.get.all)
    app.get('/categoryKnowledge/:id', checkAuth(true), categoryKnowledge.get.details)
    app.get('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.get.update)
    app.post('/categoryKnowledge/create', checkAuth(true), categoryKnowledge.post.create)
    app.post('/categoryKnowledge/update/:id', checkAuth(true), categoryKnowledge.post.update)
    app.post('/categoryKnowledge/delete/:id', checkAuth(true), categoryKnowledge.post.delete)

    //Knowledge
    app.get('/knowledge', checkAuth(true), knowledge.get.all)
    app.get('/knowledge/:id', checkAuth(true), knowledge.get.details)
    app.get('/knowledge/update/:id', checkAuth(true), knowledge.get.update)
    app.post('/knowledge/create', checkAuth(true), knowledge.post.create)
    app.post('/knowledge/update/:id', checkAuth(true), knowledge.post.update)
    app.post('/knowledge/delete/:id', checkAuth(true), knowledge.post.delete)


    //Category Therm
    app.get('/categoryTherm', checkAuth(true), categoryTerm.get.all)
    app.get('/categoryTherm/:id', checkAuth(true), categoryTerm.get.details)
    app.get('/categoryTherm/update/:id', checkAuth(true), categoryTerm.get.update)
    app.post('/categoryTherm/create', checkAuth(true), categoryTerm.post.create)
    app.post('/categoryTherm/update/:id', checkAuth(true), categoryTerm.post.update)
    app.post('/categoryTherm/delete/:id', checkAuth(true), categoryTerm.post.delete)

    //Tag
    app.get('/tag', checkAuth(true), tag.get.all)
    app.get('/tag/:id', checkAuth(true), tag.get.details)
    app.get('/tag/update/:id', checkAuth(true), tag.get.update)
    app.post('/tag/create', checkAuth(true), tag.post.create)
    app.post('/tag/update/:id', checkAuth(true), tag.post.update)
    app.post('/tag/delete/:id', checkAuth(true), tag.post.delete)

    //Job
    app.get('/job', job.get.all)
    app.get('/job/:id', checkAuth(true), job.get.details)

    app.get('/job/update/:id', checkAuth(true), job.get.update)
    app.post('/job/update/:id', checkAuth(true), job.post.update)
    app.post('/job/delete/:id', checkAuth(true), job.post.delete)

    //Message
    app.get('/message', checkAuth(true), message.get.all)
    app.get('/message/:id', checkAuth(true), message.get.details)
    app.post('/message/create', checkAuth(true), message.post.create)
    app.post('/message/delete/:id', checkAuth(true), message.post.delete)

    //Vacation
    app.get('/vacation', checkAuth(true), vacation.get.all)
    app.get('/vacation/:id', checkAuth(true), vacation.get.details)
    app.get('/vacation/update/:id', checkAuth(true), vacation.get.update)
    app.post('/vacation/create', checkAuth(true), vacation.post.create)
    app.post('/vacation/update/:id', checkAuth(true), vacation.post.update)
    app.post('/vacation/delete/:id', checkAuth(true), vacation.post.delete)

    //Role
    app.get('/role', role.get.all)
    app.get('/role/:id', checkAuth(true), role.get.details)
    app.get('/role/update/:id', checkAuth(true), role.get.update)
    app.post('/role/create', checkAuth(true), role.post.create)
    app.post('/role/update/:id', checkAuth(true), role.post.update)
    app.post('/role/delete/:id', checkAuth(true), role.post.delete)

    //Tag
    app.get('/sick', checkAuth(true), sick.get.all)
    app.get('/sick/:id', checkAuth(true), sick.get.details)
    app.get('/sick/update/:id', checkAuth(true), sick.get.update)
    app.post('/sick/create', checkAuth(true), sick.post.create)
    app.post('/sick/update/:id', checkAuth(true), sick.post.update)
    app.post('/sick/delete/:id', checkAuth(true), sick.post.delete)

    //Tag
    app.get('/homeOffice', checkAuth(true), homeOffice.get.all)
    app.get('/homeOffice/:id', checkAuth(true), homeOffice.get.details)
    app.get('/homeOffice/update/:id', checkAuth(true), homeOffice.get.update)
    app.post('/homeOffice/create', checkAuth(true), homeOffice.post.create)
    app.post('/homeOffice/update/:id', checkAuth(true), homeOffice.post.update)
    app.post('/homeOffice/delete/:id', checkAuth(true), homeOffice.post.delete)

    //Holidays
    app.get('/holidays', holidays.get.all)
    //Error
    app.get('*', error.get.displayError)
}
