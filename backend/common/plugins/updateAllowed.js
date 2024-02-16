const _ = require('lodash')

/**
 * Adds a new static method, updateAllowed, which only applies updates to fields that aren't blacklisted
 */

function updateAllowedPlugin(schema, { blacklisted = [] } = {}) {
    schema.statics.updateAllowed = function (doc, updates) {
        console.log('updating', updates, 'with', blacklisted)
        console.log('before', doc)
        _.forOwn(updates, (value, key) => {
            if (blacklisted.indexOf(key) === -1) {
                //console.log('Adding', key, value)
                // TODO FIX THE PROBLEM HERE THE CUSTOM QUESTIONS AREN'T ASSIGNED
                doc[key] = value
                // console.log('now dockey is', doc[key])
            } else {
                console.log(
                    'Skipped',
                    value,
                    key,
                    'since',
                    blacklisted.indexOf(key),
                )
            }
        })
        return doc.save()
    }
}

module.exports = updateAllowedPlugin
