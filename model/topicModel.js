var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    messages: {
        type:Array,
        required:false
    }
});
const Topic = mongoose.model('topic', topicSchema)

module.exports = Topic