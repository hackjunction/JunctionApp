const BaseValidator = require('./baseValidator');

/** Pre-defined validations for custom registration fields */

class CustomValidator extends BaseValidator {
    constructor(joi, includeLabelsInErrors = false) {
        super(joi, includeLabelsInErrors);
    }

    getValidatorForField(fieldType, fieldOptions, fieldLabel, required) {
        switch (fieldType) {
            case 'text': {
                const allowArgs = [];
                if (!required) allowArgs.push('');
                return this.joi
                    .string()
                    .min(fieldOptions.minLength || 0)
                    .max(fieldOptions.maxLength || 10000)
                    .allow(...allowArgs)
                    .label(fieldLabel);
            }
            case 'textarea': {
                const allowArgs = [];
                if (!required) allowArgs.push('');
                return this.joi
                    .string()
                    .min(fieldOptions.minLength || 0)
                    .max(fieldOptions.maxLength || 10000)
                    .allow(...allowArgs)
                    .label(fieldLabel);
            }
            case 'boolean': {
                return this.joi.boolean().label(fieldLabel);
            }
            case 'single-choice': {
                return this.joi
                    .any()
                    .valid(fieldOptions.options)
                    .label(fieldLabel);
            }
            case 'multiple-choice': {
                return this.joi
                    .array()
                    .items(this.joi.any().valid(fieldOptions.options))
                    .label(fieldLabel);
            }
            case 'checkbox': {
                return this.joi.boolean().label(fieldLabel);
            }
            default:
                return this.joi.any().label(fieldLabel);
        }
    }

    validate({ fieldType = 'text', fieldOptions = {}, fieldLabel = '', required = false }) {
        let baseValidation = this.getValidatorForField(fieldType, fieldOptions, fieldLabel, required).error(
            this.parseError
        );
        if (required) {
            baseValidation = baseValidation.required();
        }
        return value => {
            return this.format(baseValidation.validate(value));
        };
    }
}

module.exports = CustomValidator;
