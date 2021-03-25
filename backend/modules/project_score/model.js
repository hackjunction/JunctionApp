const mongoose = require('mongoose')

const STATUS_TYPES = ['submitted', 'evaluating', 'evaluated']
const ProjectScoreSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: STATUS_TYPES,
            default: STATUS_TYPES[0],
        },
        challenge: {
            type: String,
            default: null,
        },
        track: {
            type: String,
            default: null,
        },
        scoreGiver: {
            type: String,
            required: false,
        },
        score: {
            type: Number,
            required: false,
        },
        maxScore: {
            type: Number,
            required: false,
        },
        // TODO remove this once production is updated
        max_score: {
            type: Number,
            required: false,
        },
        message: {
            type: String,
            required: false,
        },
    },
    { toJSON: { virtuals: true } },
)
/* ProjectScoreSchema.index(
    {
        project: 1,
        event: 1,
        challenge: 1,
        track: 1,
    },
    {
        unique: true,
    },
) */

ProjectScoreSchema.set('timestamps', true)

const ProjectScore = mongoose.model('ProjectScore', ProjectScoreSchema)

module.exports = { ProjectScore, ProjectScoreSchema }
