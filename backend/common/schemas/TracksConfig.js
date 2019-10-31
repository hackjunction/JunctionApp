const mongoose = require('mongoose');

const TracksConfigSchema = new mongoose.Schema({
    hasTracks: {
        type: Boolean,
        required: true,
        default: false
    },
    hasChallenges: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = TracksConfigSchema;
