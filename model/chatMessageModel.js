var mongoose = require('mongoose');

var chatMessageSchema = mongoose.Schema({
    userFromId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    conversationId: {
        type: String,
        required: true
    }
});

var ChatMessage = module.exports = mongoose.model('chatMessage', chatMessageSchema);
module.exports.get = function (callback, limit) {
    ChatMessage.find(callback).limit(limit);
}