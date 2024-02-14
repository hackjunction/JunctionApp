const yup = require('yup')
//TODO this is missing cases for URL and file upload
const RegistrationFieldsCustom = {
    text: {
        id: 'text',
        validationSchema: (required, question) => {
            const base = yup
                .string()
                .min(required ? 1 : 0)
                .max(200)
                .label(question.label)
            return required ? base.required() : base
        },
    },
    textarea: {
        id: 'textarea',
        validationSchema: (required, question) => {
            const base = yup
                .string()
                .min(required ? 1 : 0)
                .max(1500)
                .label(question.label)
            return required ? base.required() : base
        },
    },
    boolean: {
        id: 'boolean',
        validationSchema: (required, question) => {
            const base = yup
                .boolean()
                .transform(value => {
                    if (!value) return false
                    return true
                })
                .label(question.label)
            return required ? base.required() : base
        },
    },
    'single-choice': {
        id: 'single-choice',
        validationSchema: (required, question) => {
            const base = yup
                .string()
                .oneOf(question.settings.options)
                .label(question.label)
            return required ? base.required() : base
        },
    },
    'multiple-choice': {
        id: 'multiple-choice',
        validationSchema: (required, question) => {
            const base = yup
                .array()
                .of(
                    yup
                        .string()
                        .oneOf(question.settings.options)
                        .label(question.label),
                )
                .label(question.label)
            return required ? base.required() : base
        },
    },
}

module.exports = RegistrationFieldsCustom
