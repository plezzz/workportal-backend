const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const messageSchema = new Schema({
        title: {
            type: String,
            required: [true, errorCommon.required('Title')],
            sparse: true,
            unique: false,
            index: true,
        },
        description:{
            type: String,
            required:[true, errorCommon.required('description')]
        },
        isRead:{
            type:Boolean,
            default:false
        },
        receiver:{
            type: ObjectId,
            ref: "User",
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        category: {
            type: String,
            default: 'user'
        },
        eventID:{
            type: ObjectId,
            ref: "Event",
        }
    }, {timestamps: true});

    return Model('Message', messageSchema);
};
