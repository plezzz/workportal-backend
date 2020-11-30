const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Number} = Schema.Types;

    const categoryTermSchema = new Schema({
        title: {
            type: String,
            minlength: [4, errorCommon.minLength('title', 4)],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [20, errorCommon.minLength('description', 20)],
            required: [true, errorCommon.required('Description')]
        },
        image: {
            type: String
        },
        count: {
            type: Number,
            default: 0
        },
        listTerms: [{
            type: ObjectId,
            ref: 'Term'
        }],
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

    return Model('CategoryTerm', categoryTermSchema);
};
