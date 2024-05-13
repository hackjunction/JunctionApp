const {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLObjectType,
    GraphQLInputObjectType,
} = require('graphql')
const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    publicId: {
        type: String,
    },
    x: {
        type: Number,
    },
    y: {
        type: Number,
    },
})

const CertificateType = new GraphQLObjectType({
    name: 'Certificate',
    fields: {
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        x: {
            type: GraphQLInt,
        },
        y: {
            type: GraphQLInt,
        },
    },
})

const CertificateInput = new GraphQLInputObjectType({
    name: 'CertificateInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        url: {
            type: GraphQLNonNull(GraphQLString),
        },
        publicId: {
            type: GraphQLNonNull(GraphQLString),
        },
        x: {
            type: GraphQLInt,
        },
        y: {
            type: GraphQLInt,
        },
    },
})

module.exports = {
    mongoose: CertificateSchema,
    graphql: CertificateType,
    graphqlInput: CertificateInput,
}
