const {saltRounds} = require('../config');
const {errorCommon,errorRegister} = require('../config/messages')();

module.exports = (mongoose, bcrypt) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Number, Boolean} = Schema.Types;

    const userSchema = new Schema({
        username: {
            type: String,
            minlength: [5, errorRegister.minLengthUsername],
            required: [true, errorCommon.required('Username')],
            unique: [true, errorRegister.alreadyInUse],
            match: [/^[a-zA-Z0-9]+$/, errorRegister.containsCharUsername],
            index: true
        },
        email: {
            type: String,
            required: [true, errorCommon.required('Email')],
            unique: [true, errorRegister.alreadyInUse],
            match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, errorRegister.minLengthEmail],
            index: true
        },
        password: {
            type: String,
            minlength: [6, errorRegister.minLengthPass],
            required: [true, errorCommon.required('Password')],
            match: [/^[a-zA-Z0-9]+$/, errorRegister.containsCharPassword],
            index: true
        },
        jobTitle: {
            type: ObjectId,
            required: [true, errorCommon.required('Job position')],
            ref: 'Job'
        },
        isLead: {
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
        vacationDays: {
            type: Number,
            default: 0,
        },
        VacationDetails:[{
            type: ObjectId,
            ref: "Vacation"
        }],
        Role: {
            type: String,
            default: 'User',
            enum: ['User']
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    });


    userSchema.virtual('repeatPassword')
        .get(function () {
            return this._repeatPassword;
        })
        .set(function (value) {
            this._repeatPassword = value;
        });

    userSchema.pre('validate', function (next) {
        if (!this.repeatPassword) {
            this.invalidate('repeatPassword', errorCommon.required('Repeat password'))
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
            next(errorRegister.alreadyInUseObj);
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
