const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString } = require('graphql')

const mongooseSchema = new mongoose.Schema({
    label: {
        type: String,
    },
    section: {
        type: String,
    },
    key: {
        type: String,
    },
    value: {
        type: String,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'CustomAnswer',
    fields: () => ({
        label: {
            type: GraphQLString,
        },
        section: {
            type: GraphQLString,
        },
        key: {
            type: GraphQLString,
        },
        value: {
            type: GraphQLString,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
