const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    partner: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
});

module.exports = ChallengeSchema;
