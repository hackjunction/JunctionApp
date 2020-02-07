const mongoose = require('mongoose')

const TYPES = [
    'challenge-placement',
    'track-placement',
    'overall-placement',
    'finalist',
]

const AchievementSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return TYPES.indexOf(v) !== -1
            },
            message: () => `Type should be one of ${TYPES.join(', ')}`,
        },
    },
    label: {
        type: String,
    },
    value: {
        type: String,
    },
    rank: {
        type: Number,
        min: 1,
    },
})

module.exports = AchievementSchema
