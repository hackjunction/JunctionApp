const mongoose = require('mongoose')

const RegistrationQuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    fieldType: {
        type: String,
        enum: [
            'text',
            'textarea',
            'boolean',
            'single-choice',
            'multiple-choice',
            'checkbox',
        ],
        required: true,
    },
    fieldRequired: {
        type: Boolean,
        default: false,
    },
    settings: {
        options: {
            type: [String],
            default: [],
            required() {
                return (
                    ['single-choice', 'multiple-choice'].indexOf(
                        this.fieldType
                    ) !== -1
                )
            },
        },
        default: {
            type: Boolean,
            default: false,
            required() {
                return ['boolean', 'checkbox'].indexOf(this.fieldType) !== -1
            },
        },
    },
})

module.exports = RegistrationQuestionSchema
