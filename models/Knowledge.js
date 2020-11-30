const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean,} = Schema.Types;

    const knowledgeSchema = new Schema({
        title: {
            type: String,
            minlength: [4, errorCommon.minLength('title', 4)],
            unique: [true, errorCommon.alreadyInUse('title')],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [20, errorCommon.minLength('description', 20)],
            maxlength: [50, errorCommon.minLength('description', 50)],
            required: [true, errorCommon.required('Description')]
        },
        image: {
            type: String
        },
        category: {
            type: ObjectId,
            ref: "CategoryKnowledge",
            required: true
        },
        tags: [{
            type: ObjectId,
            ref: "Tag",
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
        },
        isDeleted:{
            type:Boolean,
            default: false
        }
    }, {timestamps: true});

    knowledgeSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('Knowledge', 'title'));
        } else {
            next(error);
        }
    });

    return Model('Knowledge', knowledgeSchema);
};
