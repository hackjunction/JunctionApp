const mongoose = require('mongoose')

// TODO: The Project ref here might be an issue
const ScoreCriteriaSchema = new mongoose.Schema({
    criteria: {
        type: String,

    },
    label: {
        type: String,

    },
    score: {
        type: Number,
        // default: 0,

    },
}, { _id: false })

module.exports = {
    mongoose: ScoreCriteriaSchema,
}
