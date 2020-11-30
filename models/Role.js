const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const roleSchema = new Schema({
        title: {
            type: String,
            unique: true,
            required: [true, errorCommon.required('Title')],
            index: true
        },
        status: {
            type: Boolean,
            index: true,
            default: true
        },
        color: {
            type: String,
        },
        description: {
            type: String,
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
        },
        completed: {
            type: Boolean,
            default: false,
            index: true,
        },
        editedBy: {
            type: ObjectId,
            ref: "User"
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    }, {timestamps: true});

    roleSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('Tag', 'title'));
        } else {
            next(error);
        }
    });

    return Model('Role', roleSchema);
};
