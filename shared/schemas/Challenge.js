const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString } = require('graphql')

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

module.exports = {
    mongoose: ChallengeSchema,
    graphql: ChallengeType,
}
