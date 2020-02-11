const _ = require('lodash')
/**
 * - Add a 'published' field to the model
 * - Users can add a 'requiredForPublish' option to their schema fields
 * - If a field has requiredForPublish: true, that field must exist if trying to set published to true.
 */
function allowPublishPlugin(schema, { defaultPublished = false } = {}) {
    schema.add({
        published: {
            type: Boolean,
            default: defaultPublished,
            required: true,
        },
    })

    _.forOwn(schema.tree, (options, path) => {
        if (options.requiredForPublish) {
            let newOptions = {
                ...options,
                required: [
                    function() {
                        return this.published === true
                    },
                    `must be set before the event can be published!`,
                ],
            }
            delete newOptions.requiredForPublish
            schema.path(path, newOptions)
        }
    })
}

module.exports = allowPublishPlugin
