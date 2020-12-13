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
    app.get('/user/user/:id', user.get.user)
    app.get('/user/delete/:id', user.get.delete)
    app.get('/user/allUsersQuery', user.get.allQuery)

    //Category Knowledge
    app.get('/categoryKnowledge', categoryKnowledge.get.all)
    app.get('/categoryKnowledge/:id', categoryKnowledge.get.details)
    app.get('/categoryKnowledge/update/:id', categoryKnowledge.get.update)
    app.post('/categoryKnowledge/create', categoryKnowledge.post.create)
    app.post('/categoryKnowledge/update/:id', categoryKnowledge.post.update)
    app.post('/categoryKnowledge/delete/:id', categoryKnowledge.post.delete)

    //Knowledge
    app.get('/knowledge', knowledge.get.all)
    app.get('/knowledge/:id', knowledge.get.details)
    app.get('/knowledge/update/:id', knowledge.get.update)
    app.post('/knowledge/create', knowledge.post.create)
    app.post('/knowledge/update/:id', knowledge.post.update)
    app.post('/knowledge/delete/:id', knowledge.post.delete)


    //Category Therm
    app.get('/categoryTherm', categoryTerm.get.all)
    app.get('/categoryTherm/:id', categoryTerm.get.details)
    app.get('/categoryTherm/update/:id', categoryTerm.get.update)
    app.post('/categoryTherm/create', categoryTerm.post.create)
    app.post('/categoryTherm/update/:id', categoryTerm.post.update)
    app.post('/categoryTherm/delete/:id', categoryTerm.post.delete)

    //Tag
    app.get('/tag', tag.get.all)
    app.get('/tag/:id', tag.get.details)
    app.get('/tag/update/:id', tag.get.update)
    app.post('/tag/create', tag.post.create)
    app.post('/tag/update/:id', tag.post.update)
    app.post('/tag/delete/:id', tag.post.delete)

    //Job
    app.get('/job', job.get.all)
    app.get('/job/:id', job.get.details)

    app.get('/job/update/:id', job.get.update)
    app.post('/job/update/:id', job.post.update)
    app.post('/job/delete/:id', job.post.delete)

    //Message
    app.get('/message', message.get.all)
    app.get('/message/details/:id', message.get.details)
    app.post('/message/create', message.post.create)
    app.post('/message/delete/:id', message.post.delete)
    app.post('/message/update/:id', message.post.update)
    app.post('/message/getAll', message.post.getAll)

    //Vacation
    app.get('/vacation', vacation.get.all)
    app.get('/vacation/:id', vacation.get.details)
    app.get('/vacation/update/:id', vacation.get.update)
    app.post('/vacation/create', vacation.post.create)
    app.post('/vacation/update/:id', vacation.post.update)
    app.post('/vacation/delete/:id', vacation.post.delete)

    //Role
    app.get('/role', role.get.all)
    app.get('/role/:id', role.get.details)
    app.get('/role/update/:id', role.get.update)
    app.post('/role/create', role.post.create)
    app.post('/role/update/:id', role.post.update)
    app.post('/role/delete/:id', role.post.delete)

    //Tag
    app.get('/sick', sick.get.all)
    app.get('/sick/:id', sick.get.details)
    app.get('/sick/update/:id', sick.get.update)
    app.post('/sick/create', sick.post.create)
    app.post('/sick/update/:id', sick.post.update)
    app.post('/sick/delete/:id', sick.post.delete)

    //Tag
    app.get('/homeOffice', homeOffice.get.all)
    app.get('/homeOffice/:id', homeOffice.get.details)
    app.get('/homeOffice/update/:id', homeOffice.get.update)
    app.post('/homeOffice/create', homeOffice.post.create)
    app.post('/homeOffice/update/:id', homeOffice.post.update)
    app.post('/homeOffice/delete/:id', homeOffice.post.delete)

    //Holidays
    app.get('/holidays', holidays.get.all)
    //Error
    app.get('*', error.get.displayError)
}
