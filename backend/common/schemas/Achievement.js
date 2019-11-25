const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['challenge-placement', 'track-placement', 'overall-placement', 'finalist']
    },
    label: {
        type: String
    },
    value: {
        type: String
    },
    rank: {
        type: Number,
        min: 1
    }
});

module.exports = AchievementSchema;
