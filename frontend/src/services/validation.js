import moment from 'moment'
import { isEmpty } from 'lodash-es'
import Shared from '@hackjunction/shared'

export const None = () => value => {
    return
}

export const String = ({ min, max, required }) => (value = '') => {
    if (min && value.length < min) {
        return `Value must be at least ${min} characters`
    }

    if (max && value.length > max) {
        return `Value can be at most ${max} characters`
    }
    if (required && isEmpty(value)) {
        return 'This field is required'
    }

    return
}

export const Email = ({ required }) => (value = '') => {
    if (value.length > 0 && !Shared.Utils.isEmail(value)) {
        return 'Please enter a valid email address'
    }

    if (required && isEmpty(value)) {
        return 'This field is required'
    }
}

export const Date = ({ min, max, required, format = 'DD.MM.YYYY' }) => (
    value = null,
) => {
    const mom = moment(value)

    if (required && !mom.isValid()) {
        return 'This field is required'
    }

    if (mom.isValid() && mom.isAfter(max)) {
        return `Value cannot be after ${max.format(format)}`
    }

    if (mom.isValid() && mom.isBefore(min)) {
        return `Value cannot be before ${min.format(format)}`
    }

    return
}

export const Boolean = ({ required }) => (value = null) => {
    if (required && typeof value !== 'boolean') {
        return 'This field is required'
    }

    return
}

export const Array = ({ min, max, required, itemValidator }) => (
    value = [],
) => {
    if (min && value.length < min) {
        return `Value must have at least ${min} items`
    }

    if (max && value.length > max) {
        return `Can have at most ${max} items`
    }

    if (required && isEmpty(value)) {
        return `This field is required`
    }

    if (itemValidator) {
        throw new Error('Juuso please implement this')
    }

    return
}
