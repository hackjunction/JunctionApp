const RegistrationFields = require('../constants/registration-fields');
const BaseValidator = require('./baseValidator');

/** Pre-defined validations for registration fields */

class RegistrationValidator extends BaseValidator {
    constructor(joi, includeLabelsInErrors = false) {
        super(joi, includeLabelsInErrors);
    }

    validate(field, required = false) {
        let baseValidation = RegistrationFields.getValidator(this.joi, field, required).error(this.parseError);
        if (required) {
            baseValidation = baseValidation.required();
        }
        return value => {
            return this.format(baseValidation.validate(value));
        };
    }
}

module.exports = RegistrationValidator;
