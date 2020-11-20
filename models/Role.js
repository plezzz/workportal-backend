const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Number} = Schema.Types;

    const tagSchema = new Schema({
        title: {
            type: String,
            unique: true,
            required: [true, errorCommon.required('Title')],
            index: true
        },
        description:{
          type: String,
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
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

    tagSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('Tag', 'title'));
        } else {
            next(error);
        }
    });

    return Model('Tag', tagSchema);
};
