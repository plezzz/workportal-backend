const {errorCommon} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId} = Schema.Types;

    const tagSchema = new Schema({
        title: {
            type: String,
            unique:true,
            required: [true, errorCommon.required('Title')]
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
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
