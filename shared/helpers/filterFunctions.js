const objectPath = require('object-path')
const _ = require('lodash')

const _isEmpty = value => {
    switch (typeof value) {
        case 'object':
            return _.isEmpty(value)
        case 'number':
            return isNaN(value)
        case 'string':
            return value.length === 0
        case 'undefined':
            return true
        default:
            return false
    }
}

const isEmpty = (object, path) => {
    const value = objectPath.get(object, path)
    return _isEmpty(value)
}

const _isEqualTo = (value, targetValue) => {
    switch (typeof value) {
        case 'object':
            return _.isEqual(value, targetValue)
        case 'number':
            return value === targetValue
        case 'string':
            if (typeof targetValue === 'string') {
                return (
                    value.trim().toLowerCase() ===
                    targetValue.trim().toLowerCase()
                )
            }
            return value.trim().toLowerCase() == targetValue

        case 'boolean':
            return value === targetValue
        case 'undefined':
        default:
            return false
    }
}

const isEqualTo = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _isEqualTo(value, targetValue)
}

const _contains = (value, targetValue) => {
    if (typeof value === 'string') {
        if (typeof targetValue === 'string') {
            return (
                value
                    .trim()
                    .toLowerCase()
                    .indexOf(targetValue.trim().toLowerCase()) !== -1
            )
        }
        return false
    }

    if (Array.isArray(value)) {
        return value.indexOf(targetValue) !== -1
    }

    return false
}

const contains = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _contains(value, targetValue)
}

const _containsOneOf = (value, targetValue) => {
    if (!Array.isArray(targetValue)) return false

    for (const item of targetValue) {
        if (_contains(value, item)) return true
    }

    return false
}

const containsOneOf = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _containsOneOf(value, targetValue)
}

const _isGte = (value, targetValue) => {
    let numValue = parseInt(value)
    if (Array.isArray(value) || typeof value === 'string') {
        numValue = value.length
    }
    const numTarget = parseInt(targetValue)

    if (isNaN(numValue) || isNaN(numTarget)) return false

    return numValue >= numTarget
}

const isGte = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _isGte(value, targetValue)
}

const _isLte = (value, targetValue) => {
    let numValue = parseInt(value)
    if (Array.isArray(value) || typeof value === 'string') {
        numValue = value.length
    }
    const numTarget = parseInt(targetValue)

    if (isNaN(numValue) || isNaN(numTarget)) return false

    return numValue <= numTarget
}

const isLte = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _isLte(value, targetValue)
}

const _isOneOf = (value, targetValue) => {
    if (!Array.isArray(targetValue)) return false

    for (const item of targetValue) {
        if (_isEqualTo(value, item)) return true
    }

    return false
}

const isOneOf = (object, path, targetValue) => {
    const value = objectPath.get(object, path)
    return _isOneOf(value, targetValue)
}

module.exports = {
    isEmpty,
    isEqualTo,
    isGte,
    isLte,
    isOneOf,
    contains,
    containsOneOf,
    _isEmpty,
    _isEqualTo,
    _isGte,
    _isLte,
    _isOneOf,
    _contains,
    _containsOneOf,
}
