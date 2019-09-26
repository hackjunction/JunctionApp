const objectPath = require('object-path');
const _ = require('lodash');

const isEmpty = (object, path) => {
    const value = objectPath.get(object, path);

    switch (typeof value) {
        case 'object':
            return _.isEmpty(value);
        case 'number':
            return isNaN(value);
        case 'string':
            return value.length === 0;
        case 'undefined':
            return true;
        default:
            return false;
    }
};

const isEqualTo = (object, path, targetValue) => {
    const value = objectPath.get(object, path);

    switch (typeof value) {
        case 'object':
            return _.isEqual(value, targetValue);
        case 'number':
            return value === targetValue;
        case 'string':
            if (typeof targetValue === 'string') {
                return value.trim().toLowerCase() === targetValue.trim().toLowerCase();
            } else {
                return value.trim().toLowerCase() == targetValue;
            }
        case 'undefined':
        default:
            return false;
    }
};

const contains = (object, path, targetValue) => {
    const value = objectPath.get(object, path);

    if (typeof value === 'string') {
        if (typeof targetValue === 'string') {
            return (
                value
                    .trim()
                    .toLowerCase()
                    .indexOf(targetValue.trim().toLowerCase()) !== -1
            );
        }
        return false;
    }

    if (Array.isArray(value)) {
        return value.indexOf(targetValue) !== -1;
    }

    return false;
};

const isGte = (object, path, targetValue) => {
    const value = objectPath.get(object, path);
    let numValue = parseInt(value);
    if (Array.isArray(value) || typeof value === 'string') {
        numValue = value.length;
    }
    const numTarget = parseInt(targetValue);

    if (isNaN(numValue) || isNaN(numTarget)) return false;

    return numValue >= numTarget;
};

const isLte = (object, path, targetValue) => {
    const value = objectPath.get(object, path);
    let numValue = parseInt(value);
    if (Array.isArray(value) || typeof value === 'string') {
        numValue = value.length;
    }
    const numTarget = parseInt(targetValue);

    if (isNaN(numValue) || isNaN(numTarget)) return false;

    return numValue <= numTarget;
};

module.exports = {
    isEmpty,
    isEqualTo,
    isGte,
    isLte,
    contains
};
