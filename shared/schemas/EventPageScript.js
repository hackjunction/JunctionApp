const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')

const EventPageScriptSchema = new mongoose.Schema({
    page: {
        type: String,
    },
    script: {
        type: String,
    },
})

const EventPageScriptType = new GraphQLObjectType({
    name: 'EventPageScript',
    fields: {
        page: {
            type: GraphQLNonNull(GraphQLString),
        },
        script: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: EventPageScriptSchema,
    graphql: EventPageScriptType,
}
