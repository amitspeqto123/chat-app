const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum : ['text', 'image', 'mixed'],
        default: 'text'
    },
    text: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true,
})
// Optional: custom validation to ensure at least one of text or image is present
messageSchema.pre('validate', async function() {
    // 'this' is the document
    if (!this.text && !this.image) {
        throw new Error("Message must have either text or image");
    }
});

const Message = new mongoose.model('Message', messageSchema);

module.exports = Message;