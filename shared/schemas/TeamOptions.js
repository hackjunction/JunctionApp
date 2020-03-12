const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLBoolean } = require('graphql')

const mongooseSchema = new mongoose.Schema({
    applyAsTeam: {
        type: Boolean,
    },
    applyAlone: {
        type: Boolean,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'TeamOptions',
    fields: () => ({
        applyAsTeam: {
            type: GraphQLBoolean,
        },
        applyAlone: {
            type: GraphQLBoolean,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
