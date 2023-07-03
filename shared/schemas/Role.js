const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')
const Roles = require('../constants/roles')

const mongooseSchema = new mongoose.Schema({
    role: {
        type: String,
        validate: {
            validator(v) {
                return Roles.items.indexOf(v) !== -1
            },
            message: props => `${props.value} is not a valid role`,
        },
    },
    years: {
        type: Number,
        min: 1,
        max: 5,
    },
    candidates: {
        type: [String],
    },
    assigned: {
        type: String,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'Role',
    fields: () => ({
        role: {
            type: GraphQLString,
        },
        years: {
            type: GraphQLInt,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
