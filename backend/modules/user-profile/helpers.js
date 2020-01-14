const { RegistrationFields } = require('@hackjunction/shared')
const yup = require('yup')

const UserProfileHelpers = {
    validate: data => {
        const validations = {}
        Object.keys(data).forEach(field => {
            const fieldConfig = RegistrationFields.getField(field)
            if (fieldConfig) {
                validations[field] = fieldConfig.validationSchema(false)
            }
        })

        validations.avatar = yup
            .string()
            .url()
            .nullable()

        const schema = yup.object().shape(validations)
        return schema.validate(data, { stripUnknown: true })
    },
}

module.exports = UserProfileHelpers
