const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

const mongooseSchema = new mongoose.Schema({
    level: {
        type: String,
    },
    university: {
        type: String,
    },
    degree: {
        type: String,
    },
    graduationYear: {
        type: Number,
    },
    country: {
        type: String,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        level: {
            type: GraphQLString,
        },
        university: {
            type: GraphQLString,
        },
        degree: {
            type: GraphQLString,
        },
        graduationYear: {
            type: GraphQLInt,
        },
        country: {
            type: GraphQLString,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
