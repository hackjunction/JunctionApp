const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql')
const CloudinaryImageSchema = require('./CloudinaryImage')

const ChallengeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: 200,
    },
    partner: {
        type: String,
    },
    partnerEmail: {
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
    scoreCriteriaChallengeSettings: {
        type: [
            {
                criteria: {
                    type: String,
                    required: true,
                },
                label: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
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
        scoreCriteriaChallengeSettings: {
            type: new GraphQLList(
                new GraphQLObjectType({
                    name: 'scoreCriteriaChallengeSettings',
                    fields: {
                        criteria: {
                            type: GraphQLString,
                        },
                        label: {
                            type: GraphQLString,
                        },
                    },
                }),
            ),
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
        scoreCriteriaChallengeSettings: {
            type: new GraphQLList(
                new GraphQLInputObjectType({
                    name: 'scoreCriteriaChallengeSettingsInput',
                    fields: {
                        _id: {
                            type: GraphQLString,
                        },
                        criteria: {
                            type: GraphQLString,
                        },
                        label: {
                            type: GraphQLString,
                        },
                    },
                }),
            ),
        },
    },
})

module.exports = {
    mongoose: ChallengeSchema,
    graphql: ChallengeType,
    graphqlInput: ChallengeInput,
}
