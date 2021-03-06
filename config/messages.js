module.exports = {
    db: 'Connected to database successfully!',
    app: (port) => {
        return `Server is ready, listening on port: ${port}.`
    },
    errorCommon: {
        invalid: (s)=>{
            return s + ' е неалиден/о!';
        },
        required: (s) => {
            return s + ' е задължително/a!';
        },
        minLength: (s, l) => {
            return `${s} трябва да е най-малко ${l} символа`
        },
        maxLength: (s, l) => {
            return `The ${s} must be no longer than ${l} characters`
        },
        imageURL: 'The imageURL should starts with http or https',
        alreadyInUse: (s) => {
            return `${s} вече се използва!`
        },
        alreadyInUseObj: (w, s) => {
            return {
                _message: `${w} validation failed`,
                errors: {error: {properties: {message: `${s} вече се използва!`}}}
            }
        },
    },
    errorRegister: {
        dontMatch: 'The repeat password should be equal to the password',
        containsCharUsername: 'The username should consist only english letters and digits!',
        containsCharPassword: 'The password should consist only english letters and digits!',
    },
    errorLogin: {
        password: 'Потребителското име и/или паролата не съвпадат'
    },
    errorVacation: {
        approvedByLead: 'Одобрението е задължително',
    }
}

