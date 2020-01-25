const mongoose = require('mongoose')
const {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
} = require('graphql')

const RegistrationQuestionSchema = require('./RegistrationQuestion')

const RegistrationSectionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    conditional: String,
    questions: [RegistrationQuestionSchema.mongoose],
})

const RegistrationSectionType = new GraphQLObjectType({
    name: 'RegistrationSection',
    fields: {
        label: {
            type: GraphQLNonNull(GraphQLString),
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        conditional: {
            type: GraphQLString,
        },
        questions: {
            type: GraphQLList(RegistrationQuestionSchema.graphql),
        },
    },
})

module.exports = {
    mongoose: RegistrationSectionSchema,
    graphql: RegistrationSectionType,
}
