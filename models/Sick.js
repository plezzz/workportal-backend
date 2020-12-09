const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Date} = Schema.Types;

    const sickSchema = new Schema({
        description: {
            type: String,
        },
        from: {
            type: Date,
            required: [true, errorCommon.required('From date')]
        },
        to: {
            type: Date,
            required: [true, errorCommon.required('To date')]
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
        },
        editedBy: {
            type: ObjectId,
            ref: "User"
        }
    }, {timestamps: true});

    return Model('Sick', sickSchema);
};
