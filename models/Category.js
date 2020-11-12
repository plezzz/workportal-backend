const {errorTags} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const categorySchema = new Schema({
        title: {
            type: String,
            minlength: [4,errorTags.minTitle],
            required: [true, errorTags.name]
        },
        description: {
            type: String,
            minlength: [20, errorTags.minDesc],
            maxlength: [50, errorTags.maxDesc],
            required: [true, errorTags.description]
        },
        imageURL: {
            type: String,
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorTags.imageURLHTTP],
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

    return Model('Category', categorySchema);
};
