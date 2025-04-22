const mongoose = require('mongoose');

const tShowSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'Free Fire Tournament - Battle League',
    },
    description: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    createdBy: String,
    participants: {
        type: Array,
        default: []
    },
    banner: String,
    matchType: String,
    players: Number,
    tDate: {
        type: String
    },
    tTime: {
        type: String
    }


});

tShowSchema.pre('save', function (next) {
    if (!this.description) {
        this.description = `Join the action in "${this.title}" and prove your skills!`;
    }
    next();
});

module.exports = mongoose.model('tShow', tShowSchema);