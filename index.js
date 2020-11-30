global.__basedir = __dirname;
const express = require('express');
const cors = require('cors');
const {port} = require('./config');
const messages = require("./config/messages");
const globalErrorHandler = require('./config/global-error-handler');

const app = express();
require('./config/express')(express, app);
require('./config/routes')(app);
require('./config/database')()
    .then(() => {
        app.use(cors());
        app.use(globalErrorHandler);
        app.listen(port, console.log(messages.app(port)));
    })
    .catch((e) => console.log(e));
