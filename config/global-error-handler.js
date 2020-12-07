const {cookie} = require('./');
const {errorLogin} = require('../config/messages');

module.exports = function globalErrorHandler(err, req, res, next) {
   // console.log(err);
    console.log('====================');
    console.log('The message is');
    console.log(err.message);
    console.log('========or=========');
    console.log(err._message || 'other format');
    console.log('====================');


    let message = [err.message] || ['SERVER ERROR'];

    // if (res.locals.validationErrorViewName) {
    //     res.send(res.locals.validationErrorViewName, {errors: err, ...req.body});
    //     return;
    // }
    if (err.message === 'BAD_REQUEST') {
        message = 'Bad Request!';
    } else if (err.message === 'UNAUTHORIZED') {
        message = 'You don\'t have permission to view this';
    }

    if (['jwt malformed'].includes(err.message)) {
        res.clearCookie(cookie);
        render(401,err.message)
        return;
    }
    if (err.message.includes('jwt expire')) {
        res.clearCookie(cookie);
        render(401,['jwt expire'])
        return;
    }

    if (Object.values(errorLogin).includes(err.message)) {
        // res.status(401)
        // console.log('check hre',err.message)
        // res.send('need login');
        render(401, message, true);
        return;
    }

    if (err._message === 'Login validation failed') {
        let messages = normalizeErrors(err.errors);
        res.clearCookie(cookie);
        render(401,messages)
       // render('user/login', messages, true);
        return;
    }

    if (err._message === 'Course validation failed' || err._message === 'Validation failed') {
        let messages = normalizeErrors(err.errors);
        render(200,messages)
        return;
    }
    if (err._message === 'Knowledge validation failed' || err._message === 'Validation failed') {
        let messages = normalizeErrors(err.errors);
        render(200,messages)
        return;
    }
    if (err._message === 'User validation failed') {
        let messages = normalizeErrors(err.errors);
        res.status(401)
        res.send(messages)
        return;
    }

    function normalizeErrors(errors) {
        let messages = [];
        Object.values(errors).forEach(error => {
            if (error.kind === 'ObjectId') {
                messages.push(`${error.path} is undefined ${error.kind}`)
            } else {
                messages.push(error.properties.message)
            }
        });
        return messages
    }

    function render(status, message, obj = null) {
        //obj ? obj = req.body : null;
        res.status(status)
        res.send(message)

        //res.render(path, {message, obj});
    }
    console.log(message)
    res.status(401)
    res.send(message)

    //res.render('error/error', {message});
};
