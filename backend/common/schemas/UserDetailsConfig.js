const mongoose = require('mongoose')
const _ = require('lodash')
const { RegistrationFields } = require('@hackjunction/shared')

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
const UserDetailsConfigSchema = new mongoose.Schema({}, { strict: true })

_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    fields[fieldName] = generateField(
        value.schemaConfig.defaultRequire,
        value.schemaConfig.defaultEnable,
        value.schemaConfig.editable
    )
})

/** Make sure any new fields are added */
UserDetailsConfigSchema.add(fields)

/* Ensure that only the fields defined above are sent anywhere */
UserDetailsConfigSchema.methods.toJSON = function() {
    const obj = this.toObject()
    const keys = Object.keys(obj)

    keys.forEach(key => {
        if (!fields.hasOwnProperty(key)) {
            delete obj[key]
        }
    })

    return obj
}

module.exports = UserDetailsConfigSchema
