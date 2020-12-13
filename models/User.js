const {saltRounds} = require('../config');
const {errorCommon, errorRegister} = require('../config/messages');

module.exports = (mongoose, bcrypt) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Number, Boolean} = Schema.Types;

    const userSchema = new Schema({
        username: {
            type: String,
            minlength: [3, errorCommon.minLength('username', 3)],
            required: [true, errorCommon.required('Username')],
            unique: [true, errorCommon.alreadyInUse('Потребителско име')],
            match: [/^[a-zA-Z0-9]+$/, errorRegister.containsCharUsername],
            index: true
        },
        email: {
            type: String,
            required: [true, errorCommon.required('Имейлът')],
            unique: [true, errorCommon.alreadyInUse('Имейлът')],
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorCommon.invalid('Имейлът')],
            index: true
        },
        firstName: {
            type: String,
            required: [true, errorCommon.required('Името')],
        },
        lastName: {
            type: String,
            required: [true, errorCommon.required('Фамилията')],
        },
        password: {
            type: String,
            minlength: [4, errorCommon.minLength('Парола', 4)],
            required: [true, errorCommon.required('Парола')],
            match: [/^[a-zA-Z0-9]+$/, errorRegister.containsCharPassword],
            index: true
        },
        jobTitle: {
            type: ObjectId,
            required: [true, errorCommon.required('Отдел')],
            ref: 'Job'
        },
        isLead: {
            type: Boolean,
            default: false
        },
        isSupport: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        leadTeam: {
            type: ObjectId,
            ref: 'Job'
        },
        editedBy: {
            type: ObjectId,
            ref: "User"
        },
        createdBy: {
            type: ObjectId,
            ref: "User"
        },
        vacationDays: {
            type: Number,
            default: 20,
        },
        VacationDetails: [{
            type: ObjectId,
            ref: "Vacation"
        }],
        messageReceived: [{
            type: ObjectId,
            ref: "Message",
        }],
        messageSend: [{
            type: ObjectId,
            ref: "Message"
        }],
        // role: [{
        //     type: ObjectId,
        //     ref: "Role",
        //     default: '5fc4079fa0d5884d6ce5835f'
        // }],
        listKnowledge: [{
            type: ObjectId,
            ref: 'Knowledge'
        }],
        listTerms: [{
            type: ObjectId,
            ref: 'Term'
        }],
        isDisabled: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true});


    userSchema.virtual('repeatPassword')
        .get(function () {
            return this._repeatPassword;
        })
        .set(function (value) {
            this._repeatPassword = value;
        });

    userSchema.pre('validate', function (next) {
        if (!this.repeatPassword) {
            this.invalidate('repeatPassword', errorCommon.required('Повторение на паролата'))
        }
        if (this.password !== this.repeatPassword) {
            this.invalidate('repeatPassword', errorRegister.dontMatch);
        }
        next();
    });

    userSchema.methods = {
        comparePasswords(password) {
            return bcrypt.compare(password, this.password);
        }
    };

    userSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('User', 'Потребителското име/имейл'));
        } else {
            next(error);
        }
    });

    userSchema.pre('save', function (next) {

        if (!this.isModified('password')) {
            next();
            return;
        }

        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
                return;
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    return;
                }
                this.password = hash;
                next();
            })
        })
    });

    return Model('User', userSchema);
};
