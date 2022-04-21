const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
} = require('graphql')

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    partner: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
})

const ChallengeType = new GraphQLObjectType({
    name: 'Challenge',
    fields: {
        name: {
            type: GraphQLString,
        },
        partner: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLString,
        },
    },
})

const ChallengeInput = new GraphQLInputObjectType({
    name: 'ChallengeInput',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        partner: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: ChallengeSchema,
    graphql: ChallengeType,
    graphqlInput: ChallengeInput,
}
