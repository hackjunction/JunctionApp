const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')
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
