const mongoose = require('mongoose')
const {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean,
} = require('graphql')

const SubmissionDefaultFieldsSchema = new mongoose.Schema({
    name: {
        type: Boolean,
        required: true,
        default: true,
    },
    images: {
        type: Boolean,
        required: true,
        default: true,
    },
    punchline: {
        type: Boolean,
        required: true,
        default: true,
    },
    description: {
        type: Boolean,
        required: true,
        default: true,
    },
    track: {
        type: Boolean,
        required: true,
        default: true,
    },
    challenges: {
        type: Boolean,
        required: true,
        default: true,
    },
    technologies: {
        type: Boolean,
        required: true,
        default: true,
    },
    video: {
        type: Boolean,
        required: true,
        default: true,
    },
    demo: {
        type: Boolean,
        required: true,
        default: true,
    },
    source: {
        type: Boolean,
        required: true,
        default: true,
    },
    sourcePublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    location: {
        type: Boolean,
        required: true,
        default: true,
    },
    privacy: {
        type: Boolean,
        required: true,
        default: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
})

const SubmissionDefaultFieldsType = new GraphQLObjectType({
    name: 'SubmissionDefaultFields',
    fields: {
        name: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        images: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        punchline: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        description: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        track: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        challenges: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        technologies: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        video: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        demo: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        source: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        sourcePublic: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        location: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        privacy: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        status: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
    },
})

const SubmissionDefaultFieldsInput = new GraphQLInputObjectType({
    name: 'SubmissionDefaultFieldsInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        images: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        punchline: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        description: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        track: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        challenges: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        technologies: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        video: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        demo: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        source: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        sourcePublic: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        location: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        privacy: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
        status: {
            type: GraphQLBoolean,
            required: true,
            default: true,
        },
    },
})

module.exports = {
    mongoose: SubmissionDefaultFieldsSchema,
    graphql: SubmissionDefaultFieldsType,
    graphqlInput: SubmissionDefaultFieldsInput,
}
