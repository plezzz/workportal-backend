const {errorCommon,errorKnowledge} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const knowledgeSchema = new Schema({
        title: {
            type: String,
            minlength: [4,errorKnowledge.minTitle],
            unique: [true, errorKnowledge.alreadyInUse],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [20, errorKnowledge.minDesc],
            maxlength: [50, errorKnowledge.maxDesc],
            required: [true, errorCommon.required('Description')]
        },
        imageURL: {
            type: String,
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorKnowledge.imageURLHTTP],
        },
        category: {
            type: ObjectId,
            ref: "CategoryTherm",
            required: true
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

    knowledgeSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorKnowledge.alreadyInUseObj);
        } else {
            next(error);
        }
    });

    return Model('Knowledge', knowledgeSchema);
};
