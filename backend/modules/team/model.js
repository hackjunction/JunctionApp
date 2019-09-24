const mongoose = require('mongoose');
const shortid = require('shortid');

const TeamSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        default: []
    },
    code: {
        type: String,
        default: shortid.generate
    },
    locked: {
        type: Boolean,
        default: false
    }
});

TeamSchema.set('timestamps', true);
TeamSchema.index({ event: 1, owner: 1, code: 1, members: 1 });

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
