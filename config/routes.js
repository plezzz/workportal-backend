module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());

    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/knowledge', routers.course);
    app.use('/', routers.home);
    app.use('*', routers.error)
}
