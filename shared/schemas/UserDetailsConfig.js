const mongoose = require('mongoose')
const _ = require('lodash')
const { GraphQLObjectType } = require('graphql')
const UserDetailsConfigItemType = require('./UserDetailsConfigItem').graphql
const RegistrationFields = require('../constants/registration-fields')

function generateField(defaultRequire, defaultEnable, editable = true) {
    return {
        require: {
            type: Boolean,
            default: defaultRequire,
        },
        enable: {
            type: Boolean,
            default: defaultEnable,
        },
        editable: {
            type: Boolean,
            default: editable,
            set() {
                return editable
            },
        },
    }
}

const fields = {}
const graphQLFields = {}
const UserDetailsConfigSchema = new mongoose.Schema({}, { strict: true })

_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    fields[fieldName] = generateField(
        value.schemaConfig.defaultRequire,
        value.schemaConfig.defaultEnable,
        value.schemaConfig.editable
    )

    graphQLFields[fieldName] = {
        type: UserDetailsConfigItemType,
    }
})

/** Make sure any new fields are added */
UserDetailsConfigSchema.add(fields)

/* Ensure that only the fields defined above are sent anywhere */
UserDetailsConfigSchema.methods.toJSON = function() {
    const obj = this.toObject()
    const keys = Object.keys(obj)

    keys.forEach(key => {
        if (!(key in fields)) {
            delete obj[key]
        }
    })

    return obj
}

const UserDetailsConfigType = new GraphQLObjectType({
    name: 'UserDetailsConfig',
    fields: graphQLFields,
})

module.exports = {
    mongoose: UserDetailsConfigSchema,
    graphql: UserDetailsConfigType,
}
