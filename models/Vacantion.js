const {errorVacation} = require('../config/messages')();

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Date} = Schema.Types;

    const vacationSchema = new Schema({
        title: {
            type: String,
            unique: true,
            required: [true, errorVacation.name]
        },
        description: {
            type: String,
        },
        approvedByLead: {
            type: ObjectId,
            ref: 'User',
            required: [true, errorVacation.approvedByLead]
        },
        approvedByAdmin: {
            type: ObjectId,
            ref: 'User',
            required: [true, errorVacation.approvedByLead]
        },
        from: {
            type: Date,
            required: [true, errorVacation.from]
        },
        to: {
            type: Date,
            required: [true, errorVacation.to]
        },
        isApprovedByLead: {
            type: Boolean,
            default: false
        },
        isApprovedByAdmin: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: string,
            default: 'В изчакване',
            enum: ['за одобрение от началник','за одобрение от шеф','одобрена', 'отказана']
        },
        editedBy: {
            type: ObjectId,
            ref: "User"
        }
    }, {timestamps: true});

    return Model('Vacation', vacationSchema);
};
