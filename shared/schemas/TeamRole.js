const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')
const Roles = require('../constants/roles')
const { GraphQLList } = require('graphql')

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
    candidates: {
        type: [String],
    },
    assigned: {
        type: String,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'TeamRole',
    fields: () => ({
        role: {
            type: GraphQLString,
        },
        candidates: {
            type: GraphQLList(GraphQLString),
        },
        assigned: {
            type: GraphQLString,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
