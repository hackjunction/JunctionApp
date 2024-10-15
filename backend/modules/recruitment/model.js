const mongoose = require('mongoose')

const ACTION_TYPES = ['favorite', 'remove-favorite', 'message', 'remind']

const RecruitmentActionSchema = new mongoose.Schema(
    {
        recruiter: {
            type: String,
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
        // TODO Migrate this when done with the organizations feature
        organisation: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ACTION_TYPES,
        },
        data: {
            type: mongoose.Mixed,
            default: {},
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
    },
    // { toJSON: { virtuals: true } },
)

// RecruitmentActionSchema.virtual('_user', {
//     ref: 'UserProfile', // The model to use
//     localField: 'user', // Find people where `localField`
//     foreignField: 'userId', // is equal to `foreignField`
//     justOne: true,
// })

// RecruitmentActionSchema.virtual('_recruiter', {
//     ref: 'UserProfile', // The model to use
//     localField: 'recruiter', // Find people where `localField`
//     foreignField: 'userId', // is equal to `foreignField`
//     justOne: true,
// })

RecruitmentActionSchema.set('timestamps', true)

const RecruitmentAction = mongoose.model(
    'RecruitmentAction',
    RecruitmentActionSchema,
)

module.exports = { RecruitmentAction, RecruitmentActionSchema }
