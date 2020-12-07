const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Date, Boolean} = Schema.Types;

    const homeOfficeSchema = new Schema({
        description: {
            type: String,
        },
        approvedByAdmin: {
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
        isApprovedByAdmin: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            default: 'изчакване',
            enum: ['изчакване', 'одобрена', 'отказана']
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

    return Model('HomeOffice', homeOfficeSchema);
};
