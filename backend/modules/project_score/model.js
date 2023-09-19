const mongoose = require('mongoose')
const ScoreCriteriaSchema = require('@hackjunction/shared/schemas/ScoreCriteria')

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
        score: {
            type: Number,
            required: false,
        },
        maxScore: {
            type: Number,
            required: false,
        },
        message: {
            type: String,
            required: false,
        },
        scoreCriteria: {
            type: [ScoreCriteriaSchema.mongoose],
            required: false,
        },
        // scoreCriteria: {
        //     type: [
        //         {
        //             criteria: {
        //                 type: String,
        //                 required: true,
        //             },
        //             label: {
        //                 type: String,
        //                 required: true,
        //             },
        //             score: {
        //                 type: Number,
        //                 required: true,
        //             },
        //         },
        //     ],
        //     required: false,
        // },
    },
    { toJSON: { virtuals: true } },
)
ProjectScoreSchema.index(
    {
        project: 1,
        event: 1,
        challenge: 1,
        track: 1,
    },
    {
        unique: true,
    },
)

ProjectScoreSchema.set('timestamps', true)

const ProjectScore = mongoose.model('ProjectScore', ProjectScoreSchema)

module.exports = { ProjectScore, ProjectScoreSchema }
