const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = TrackSchema;
