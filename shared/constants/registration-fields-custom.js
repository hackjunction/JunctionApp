const yup = require('yup')

const RegistrationFieldsCustom = {
    text: {
        id: 'text',
        validationSchema: (required, question) => {
            return yup
                .string()
                .min(required ? 1 : 0)
                .max(200)
                .label(question.label)
        },
    },
    textarea: {
        id: 'textarea',
        validationSchema: (required, question) => {
            return yup
                .string()
                .min(required ? 1 : 0)
                .max(1500)
                .label(question.label)
        },
    },
    boolean: {
        id: 'boolean',
        validationSchema: (required, question) => {
            return yup
                .boolean()
                .transform(value => {
                    if (!value) return false
                    return true
                })
                .label(question.label)
        },
    },
    'single-choice': {
        id: 'single-choice',
        validationSchema: (required, question) => {
            return yup
                .string()
                .oneOf(question.settings.options)
                .label(question.label)
        },
    },
    'multiple-choice': {
        id: 'multiple-choice',
        validationSchema: (required, question) => {
            return yup
                .array()
                .of(
                    yup
                        .string()
                        .oneOf(question.settings.options)
                        .label(question.label)
                )
                .label(question.label)
        },
    },
}

module.exports = RegistrationFieldsCustom
