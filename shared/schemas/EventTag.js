const { GraphQLObjectType, GraphQLString } = require('graphql')
const mongoose = require('mongoose')

const EventTagSchema = new mongoose.Schema({
    label: {
        type: String,
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
})

const EventTagType = new GraphQLObjectType({
    name: 'EventTag',
    fields: {
        label: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: EventTagSchema,
    graphql: EventTagType,
}
