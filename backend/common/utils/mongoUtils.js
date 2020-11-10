const mongodb = require('mongodb')
const mongoose = require('mongoose')
const _ = require('lodash')

const MongoUtils = {
    ensureObjectId: value => {
        if (Array.isArray(value)) {
            return value.map(item => MongoUtils.ensureObjectId(item))
        }
        if (typeof value === 'object') {
            if (Object.keys(value).length > 0) {
                return _.mapValues(value, field => {
                    return MongoUtils.ensureObjectId(field)
                })
            }
        } else if (value.length === 24 && mongodb.ObjectID.isValid(value)) {
            return mongoose.Types.ObjectId(value)
        }
        return value
    },
    filterOperatorToMongoOperator: operator => {
        if (operator === '<') return '$lt'
        if (operator === '<=') return '$lte'
        if (operator === '>') return '$gt'
        if (operator === '>=') return '$gte'
        if (operator === '==') return '$eq'
        if (operator === '!=') return '$ne'
        if (operator === 'array-element-match') return '$elemMatch'
        if (operator === 'contains') return '$in'
        if (operator === 'contains-all') return '$all'
        if (operator === 'not-contains') return '$nin'
    },
}

module.exports = MongoUtils
