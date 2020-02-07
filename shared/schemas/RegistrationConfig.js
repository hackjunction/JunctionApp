const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql')

const RegistrationConfigSchema = new mongoose.Schema({
    optionalFields: {
        type: [String],
    },
    requiredFields: {
        type: [String],
    },
})

const RegistrationConfigType = new GraphQLObjectType({
    name: 'RegistrationConfig',
    fields: {
        optionalFields: {
            type: GraphQLList(GraphQLString),
        },
        requiredFields: {
            type: GraphQLList(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: RegistrationConfigSchema,
    graphql: RegistrationConfigType,
}
