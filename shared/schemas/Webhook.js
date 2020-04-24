const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
} = require('graphql')

// TODO: The Project ref here might be an issue
const WebhookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    resource: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    enabled: {
        type: Boolean,
        required: true,
    },
})

const WebhookType = new GraphQLObjectType({
    name: 'Webhook',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        resource: {
            type: GraphQLNonNull(GraphQLString),
        },
        action: {
            type: GraphQLNonNull(GraphQLString),
        },
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        enabled: {
            type: GraphQLBoolean,
        },
    },
})

module.exports = {
    mongoose: WebhookSchema,
    graphql: WebhookType,
}
