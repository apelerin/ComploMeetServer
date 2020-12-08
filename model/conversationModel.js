var mongoose = require('mongoose');

var conversationSchema = mongoose.Schema({
    participants: {
        type: Array,
        required: true
    }
});

var Conversation = module.exports = mongoose.model('conversation', conversationSchema);
module.exports.get = function (callback, limit) {
    Conversation.find(callback).limit(limit);
}