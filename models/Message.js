const {errorCommon} = require('../config/messages');

module.exports = (mongoose) => {
    const {Schema, model: Model} = mongoose;
    const {String, ObjectId, Boolean} = Schema.Types;

    const messageSchema = new Schema({
        title: {
            type: String,
            unique:true,
            required: [true, errorCommon.required('Title')]
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
            required: true
        },
        createdBy: {
            type: ObjectId,
            ref: "User",
            required: true
        },
    }, {timestamps: true});

    return Model('Message', messageSchema);
};
