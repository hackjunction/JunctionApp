const mongoose = require('mongoose');

const ParticipantConfigSchema = new mongoose.Schema({
    reviewEnabled: {
        type: Boolean,
        required: true,
        default: true
    },
    limit: {
        type: Number,
        required: [
            function() {
                return this.reviewEnabled === false;
            },
            'is required if participant reviewing is not enabled'
        ]
    }
});

module.exports = ParticipantConfigSchema;
