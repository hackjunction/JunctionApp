const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLID,
} = require('graphql')
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

const EventTagInput = new GraphQLInputObjectType({
    name: 'EventTagInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
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
    graphqlInput: EventTagInput,
}
