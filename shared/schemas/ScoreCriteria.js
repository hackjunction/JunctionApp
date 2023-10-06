const mongoose = require('mongoose')

// TODO: The Project ref here might be an issue
const ScoreCriteriaSchema = new mongoose.Schema({
    criteria: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
})

module.exports = {
    mongoose: ScoreCriteriaSchema,
}
