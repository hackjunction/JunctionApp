const mongoose = require('mongoose')
const RegistrationQuestionSchema = require('@hackjunction/shared/schemas/RegistrationQuestion')

const RegistrationSectionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    conditional: String,
    questions: [new mongoose.Schema(RegistrationQuestionSchema.mongoose)],
})

module.exports = RegistrationSectionSchema
