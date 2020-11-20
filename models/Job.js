const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const jobSchema = new Schema({
        title: {
            type: String,
            unique:true,
            required: [true, errorCommon.required('Title')]
        },
        employees:[{
           type: ObjectId,
           ref: "User"
        }],
        lead:{
            type: ObjectId,
            ref: "User",
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

    jobSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(errorCommon.alreadyInUseObj('Tag', 'title'));
        } else {
            next(error);
        }
    });

    return Model('Job', jobSchema);
};
