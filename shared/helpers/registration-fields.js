const RegistrationFields = require('../constants/registration-fields')

const RegistrationFieldsHelpers = {
    buildValidationSchema: (yup, fields) => {
        const schema = {}

        fields.forEach(({ fieldName, require }) => {
            const fieldParams = RegistrationFields.getField(fieldName)
            if (fieldParams) {
                schema[fieldName] = fieldParams.validationSchema(yup, require)
            }
        })

        return schema
    },
}

module.exports = RegistrationFieldsHelpers
