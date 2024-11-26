const mongoose = require('mongoose')
const { Schema } = mongoose
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')
const Misc = require('../constants/misc')

const mongooseSchema = new Schema({
    eventId: {
        type: String,
        required: true,
    },
    organisation: {
        type: String,
        default: '',
    },
})

const RecruiterEventType = new GraphQLObjectType({
    name: 'RecruiterEvent',
    fields: {
        eventId: {
            type: GraphQLNonNull(GraphQLString),
        },
        organisation: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const RecruiterEventInput = new GraphQLInputObjectType({
    name: 'RecruiterEventInput',
    fields: {
        eventId: {
            type: GraphQLNonNull(GraphQLString),
        },
        organisation: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: RecruiterEventType,
    graphqlInput: RecruiterEventInput,
}
