const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')

// TODO: The Project ref here might be an issue
const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const PartnerType = new GraphQLObjectType({
    name: 'Partner',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: PartnerSchema,
    graphql: PartnerType,
}
