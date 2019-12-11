const mongoose = require('mongoose');

/** Schema for storing event results */

const RankingsSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    tag: {
        type: String,
        enum: ['overall-ranking', 'finalists']
    },
    track: {
        type: String
    },
    challenge: {
        type: String
    },
    rankings: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Project',
                required: true
            },
            rank: {
                type: Number,
                required: true
            }
        }
    ]
});

/** Only allow a single rankings document per event/track combination */
RankingsSchema.index(
    {
        event: 1,
        track: 1
    },
    {
        unique: true,
        sparse: true
    }
);

/** Only allow a single rankings document per event/challenge combination */
RankingsSchema.index(
    {
        event: 1,
        challenge: 1
    },
    {
        unique: true,
        sparse: true
    }
);

/** Only allow a single rankings document per event/tag combination, e.g. overall winners */
RankingsSchema.index(
    {
        event: 1,
        tag: 1
    },
    {
        unique: true,
        sparse: true
    }
);

const Rankings = mongoose.model('Rankings', RankingsSchema);

module.exports = Rankings;
