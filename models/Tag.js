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
        count: {
            type: Number,
            default: 0
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

    return Model('Tag', tagSchema);
};
