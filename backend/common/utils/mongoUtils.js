const mongodb = require('mongodb')
const mongoose = require('mongoose')
const _ = require('lodash')

const { ForbiddenError } = require('../errors/errors')

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
            console.log('IS VALID MONGO ID', value)
            return mongoose.Types.ObjectId(value)
        }
        return value
    },
    filterOperatorToMongoOperator: operator => {
        switch (operator) {
            case '<':
                return '$lt'
            case '<=':
                return '$lte'
            case '>':
                return '$gt'
            case '>=':
                return '$gte'
            case '==':
                return '$eq'
            case '!=':
                return '$ne'
            case 'array-element-match':
                return '$elemMatch'
            case 'contains':
                return '$all'
            case 'not-contains':
                return '$nin'
            default: {
                throw new ForbiddenError(
                    `Unsupported filter operator ${operator}`
                )
            }
        }
    },
}

module.exports = MongoUtils
