const _ = require('lodash')

/**
 * Adds a new static method, getPublic, which returns only a subset of fields on the document
 */

function publicFieldsPlugin(schema, { fields = [] } = {}) {
    schema.statics.publicFields = function(docs) {
        if (Array.isArray(docs)) {
            return docs.map(doc => {
                return _.pick(doc.toJSON(), fields)
            })
        } else {
            return _.pick(docs.toJSON(), fields)
        }
    }
}

module.exports = publicFieldsPlugin
