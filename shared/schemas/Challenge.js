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
    partnerEmail: {
        type: String,
        required: true,
    },
    partnerEmail: {
        type: String,
        required: true,
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
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    insights: {
        type: String,
        required: true,
    },
    resources: {
        type: String,
        required: true,
    },
    prizes: {
        type: String,
        required: true,
    },
    criteria: {
        type: String,
        required: true,
    },
    companyInfo: {
        type: String,
        required: true,
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
        partnerEmail: {
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
        partnerEmail: {
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
    },
})

module.exports = {
    mongoose: ChallengeSchema,
    graphql: ChallengeType,
    graphqlInput: ChallengeInput,
}