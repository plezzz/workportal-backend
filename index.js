global.__basedir = __dirname;
const express = require('express');
const {port} = require('./config');
const messages = require("./config/messages");
const globalErrorHandler = require('./config/global-error-handler');

const app = express();
require('./config/express')(express,app);
require('./config/routes')(app);
require('./config/database')()
    .then(() => {

        app.use(globalErrorHandler);
        app.listen(port, console.log(messages.app(port)));
    })
    .catch((e) => console.log(e));
