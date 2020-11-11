const {errorTags} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId} = Schema.Types;

    const tagSchema = new Schema({
        title: {
            type: String,
            minlength: [4,errorTags.minTitle],
            required: [true, errorTags.name]
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        editedBy:{
            type: ObjectId,
            ref: "User",
        }
    }, {timestamps: true});

    return Model('Tag', tagSchema);
};
