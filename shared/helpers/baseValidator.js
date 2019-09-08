/** Validation helper */

class BaseValidator {
    constructor(joi, includeLabelsInErrors = false) {
        this.joi = joi;
        this.includeLabelsInErrors = includeLabelsInErrors;

        this.validate = this.validate.bind(this);
        this.parseError = this.parseError.bind(this);
    }

    parseError(errors) {
        const label = this.includeLabelsInErrors ? error.context.label + ' ' : '';
        const error = errors[0];
        switch (error.type) {
            case 'any.empty':
                return `${label}can't be empty`;
            case 'any.required':
                return `${label}can't be empty`;
            case 'any.allowOnly': {
                let valids = error.context.valids.join(',');
                if (valids.length > 100) {
                    valids = valids.slice(0, 100) + '...';
                }
                return `${label}must be one of: ${valids}`;
            }
            case 'string.base':
                return `${label}must be a string`;
            case 'string.max':
                return `${label}can be at most ${error.context.limit} characters`;
            case 'string.min':
                return `${label}must be at least ${error.context.limit} characters`;
            case 'string.email':
                return `${label}must be a valid email address`;
            case 'string.uri':
                return `${label}must be a valid url`;
            case 'string.regex.base':
                return `${label}is invalid`;
            case 'date.min': {
                const d = new Date(error.context.limit);
                const dateString = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
                return `${label}must be after ${dateString}`;
            }
            case 'date.max': {
                const d = new Date(error.context.limit);
                const dateString = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
                return `${label}must be before ${dateString}`;
            }
            case 'array.includesOne': {
                return `${JSON.stringify(error.context.value)} is not a valid value for ${label.trim()}`;
            }
            case 'array.min': {
                return `${label}must contain at least ${error.context.limit} item(s)`;
            }
            case 'array.max': {
                return `${label}can't have more than ${error.context.limit} item(s)`;
            }
            case 'object.child': {
                return `${error.context.child} ${this.parseError(error.context.reason)}`;
            }
            default:
                console.log('UNDEFINED ERROR', error);
                return `${label}Invalid value`;
        }
    }

    format(validationResult) {
        if (validationResult.error === null) {
            return;
        } else {
            return validationResult.error.message;
        }
    }

    validate() {
        return value => this.format(this.joi.any().validate(value));
    }
}

module.exports = BaseValidator;
