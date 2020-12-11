var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Not specified"],
        required: true
    },
    sexual_orientation: {
        type: String,
        enum: [
            'Asexual',
            'Bisexual',
            'Heterosexual',
            'Homosexual',
            'Androphilia',
            'Gynephilia',
            'Bi-curious',
            'Gray asexual',
            'Non-heterosexual',
            'Pansexual',
            'Queer'
        ],
        required: true
    },
    description: {
        type: String,
        default: "Hey! I would love to hear about your BIG theory. ;-)"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    users_liked: {
        type: Array,
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    profile_pictures: {
        type: Array
    },
    conversationInvolvedIn: {
        type: Array
    },

    conspiracies: {
      type: Array
    }
});

// Export User Model
var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}