global.__basedir = __dirname;
const express = require('express');
const cors = require('cors');
const {port, origin} = require('./config');
const messages = require("./config/messages");
const globalErrorHandler = require('./config/global-error-handler');

const app = express();
require('./config/express')(express, app);
require('./config/routes')(app);
require('./config/database')()
    .then(() => {
        app.use(cors({
            origin: '*',
            credentials: true,
        }));

        // app.use(function(req, res, next) {
        //     res.header('Access-Control-Allow-Credentials', 'true');
        //     res.header('Access-Control-Allow-Origin', req.headers.origin);
        //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        //     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        //     next();
        // });
        app.use(globalErrorHandler);
        app.listen(port, console.log(messages.app(port)));
    })
    .catch((e) => console.log(e));
