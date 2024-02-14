const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
} = require('graphql')
const CloudinaryImageSchema = require('./CloudinaryImage')

const HackerpackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    partner: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    logo: CloudinaryImageSchema.mongoose,
    link: {
        type: String,
    },
})

const HackerpackType = new GraphQLObjectType({
    name: 'Hackerpack',
    fields: {
        name: {
            type: GraphQLString,
        },
        partner: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        logo: {
            type: CloudinaryImageSchema.graphql,
        },
        link: {
            type: GraphQLString,
        },
    },
})

const HackerpackInput = new GraphQLInputObjectType({
    name: 'HackerpackInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        partner: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        logo: {
            type: CloudinaryImageSchema.graphqlInput,
        },
        link: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: HackerpackSchema,
    graphql: HackerpackType,
    graphqlInput: HackerpackInput,
}
