const {errorCommon, errorVacation} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Date, Boolean} = Schema.Types;

    const vacationSchema = new Schema({
        description: {
            type: String,
        },
        approvedByLead: {
            type: ObjectId,
            ref: 'User',
        },
        approvedByAdmin: {
            type: ObjectId,
            ref: 'User',
        },
        replacement:{
            type: ObjectId,
            ref: 'User',
        },
        from: {
            type: Date,
            required: [true, errorCommon.required('From date')]
        },
        to: {
            type: Date,
            required: [true, errorCommon.required('To date')]
        },
        isApprovedByLead: {
            type: Boolean,
            default: false
        },
        isApprovedByAdmin: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: 'изчакване',
            enum: ['изчакване','за одобрение от началник', 'за одобрение от шеф', 'одобрена', 'отказана']
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

    return Model('Vacation', vacationSchema);
};
