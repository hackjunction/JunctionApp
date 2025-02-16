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
                doc[key] = value
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
