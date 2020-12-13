const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Date, Number} = Schema.Types;

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
        days:{
            type: Number
        },
        workDays:{
            type: Number
        },
        category:{
            type: String,
            default: 'Болничен'
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
        },
        editedBy: {
            type: ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            default: 'одобрена'
        }
    }, {timestamps: true});

    return Model('Sick', sickSchema);
};
