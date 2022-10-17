const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
} = require('graphql')
const CloudinaryImageSchema = require('./CloudinaryImage')

const ChallengeSchema = new mongoose.Schema({
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
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    description: {
        type: String,
    },
    insights: {
        type: String,
    },
    resources: {
        type: String,
    },
    prizes: {
        type: String,
    },
    criteria: {
        type: String,
    },
    companyInfo: {
        type: String,
    },
    logo: CloudinaryImageSchema.mongoose,
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
        title: {
            type: GraphQLString,
        },
        subtitle: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        insights: {
            type: GraphQLString,
        },
        resources: {
            type: GraphQLString,
        },
        prizes: {
            type: GraphQLString,
        },
        criteria: {
            type: GraphQLString,
        },
        companyInfo: {
            type: GraphQLString,
        },
        logo: {
            type: CloudinaryImageSchema.graphql,
        },
    },
})

const ChallengeInput = new GraphQLInputObjectType({
    name: 'ChallengeInput',
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
        title: {
            type: GraphQLString,
        },
        subtitle: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        insights: {
            type: GraphQLString,
        },
        resources: {
            type: GraphQLString,
        },
        prizes: {
            type: GraphQLString,
        },
        criteria: {
            type: GraphQLString,
        },
        companyInfo: {
            type: GraphQLString,
        },
        logo: {
            type: CloudinaryImageSchema.graphqlInput,
        },
    },
})

module.exports = {
    mongoose: ChallengeSchema,
    graphql: ChallengeType,
    graphqlInput: ChallengeInput,
}