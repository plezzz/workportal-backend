const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const thermSchema = new Schema({
        title: {
            type: String,
            minlength: [4,errorCommon.minLength('title',4)],
            unique: [true, errorCommon.alreadyInUse('title')],
            required: [true, errorCommon.required('Title')]
        },
        description: {
            type: String,
            minlength: [20, errorCommon.minLength('description',20)],
            maxlength: [50, errorCommon.minLength('description',50)],
            required: [true, errorCommon.required('Description')]
        },
        imageURL: {
            type: String,
            match: [/^((http|https):\/\/){1,1}(w{3,3}\.)?/, errorCommon.imageURL],
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

    thermSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('Therm','title'));
        } else {
            next(error);
        }
    });

    return Model('Therm', thermSchema);
};
