const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean, Number} = Schema.Types;

    const categoryKnowledgeSchema = new Schema({
        title: {
            type: String,
            unique: [true, errorCommon.alreadyInUse('title')],
            minlength: [2, errorCommon.minLength('title', 2)],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [4, errorCommon.minLength('description', 4)],
            required: [true, errorCommon.required('Description')]
        },
        image: {
            type: String,
        },
        count: {
            type: Number,
            default: 0
        },
        listKnowledge: [{
            type: ObjectId,
            ref: 'Knowledge'
        }],
        listTags: [{
            type: ObjectId,
            ref: 'Tag'
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

    categoryKnowledgeSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('CategoryKnowledge', 'title'));
        } else {
            next(error);
        }
    });

    return Model('CategoryKnowledge', categoryKnowledgeSchema);
};
