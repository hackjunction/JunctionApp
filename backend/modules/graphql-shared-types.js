const { buildSchema } = require('graphql')
const { SharedGraphQLTypes } = require('@hackjunction/shared/schemas')

const SharedSchema = buildSchema(SharedGraphQLTypes)

module.exports = SharedSchema._typeMap
