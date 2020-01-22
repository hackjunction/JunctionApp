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
        validate: {
            validator(v) {
                return v > 1900 && v < 2100
            },
            message: () => 'Graduation year must be between 1900 and 2100',
        },
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
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
