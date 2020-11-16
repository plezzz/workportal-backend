module.exports = {
    db: 'Connected to database successfully!',
    app: (port) => {
        return `Server is ready, listening on port: ${port}.`
    },
    errorCommon: {
        required: (s) => {
            return s + ' is require!';
        },
        minLength: (s, l) => {
            return `The ${s} should be at least ${l} characters long`
        },
        maxLength: (s, l) => {
            return `The ${s} must be no longer than ${l} characters`
        },
        imageURL: 'The imageURL should starts with http or https',
        alreadyInUse: (s) => {
            return `The given ${s} is already is use!`
        },
        alreadyInUseObj: (w, s) => {
            return {
                _message: `${w} validation failed`,
                errors: {error: {properties: {message: `The given ${s} is already is use!`}}}
            }
        },
    },
    errorRegister: {
        dontMatch: 'The repeat password should be equal to the password',
        containsCharUsername: 'The username should consist only english letters and digits!',
        containsCharPassword: 'The password should consist only english letters and digits!',
    },
    errorLogin: {
        password: 'The provided username or password does not matched'
    },
    errorVacation: {
        approvedByLead: 'Approve is required',
    }
}

