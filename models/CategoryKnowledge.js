const {errorCommon,errorTags} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Number} = Schema.Types;

    const categoryKnowledgeSchema = new Schema({
        title: {
            type: String,
            minlength: [2,errorTags.minTitle],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [4, errorTags.minDesc],
            required: [true, errorTags.description]
        },
        imageURL: {
            type: String,
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorTags.imageURLHTTP],
        },
        count: {
            type: Number,
            default: 0
        },
        listKnowledge: {
            type:ObjectId,
            ref: 'Knowledge'
        },
        listTags:{
            type:ObjectId,
            ref: 'Tag'
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

    return Model('categoryKnowledge', categoryKnowledgeSchema);
};
