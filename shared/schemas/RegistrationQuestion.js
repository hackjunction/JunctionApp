const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLID,
} = require('graphql')
const RegistrationQuestionSettingsType = require('./RegistrationQuestionSettings')
    .graphql
const RegistrationQuestionSettingsInput = require('./RegistrationQuestionSettings')
    .graphqlInput

const FIELD_TYPES = [
    'text',
    'textarea',
    'boolean',
    'link',
    'attachment',
    'single-choice',
    'multiple-choice',
    'checkbox',
]

const RegistrationQuestionSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    label: {
        type: String,

    },
    hint: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    fieldType: {
        type: String,

        validate: {
            validator: v => FIELD_TYPES.indexOf(v) !== -1,
            message: () => `Field type must be one of ${FIELD_TYPES.join(',')}`,
        },
    },
    // TODO rename to just 'required' to be uniform with normal qestion field
    fieldRequired: {
        type: Boolean,
        default: false,
    },
    settings: {
        options: {
            type: [String],
            default: [],
        },
        default: {
            type: Boolean,
            default: false,
        },
        maxSize: {
            type: Number,
        },
        allowedTypes: {
            type: [String],
        },
    },
}, { _id: false })

const RegistrationQuestionType = new GraphQLObjectType({
    name: 'RegistrationQuestion',
    fields: {
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        label: {
            type: GraphQLNonNull(GraphQLString),
        },
        hint: {
            type: GraphQLString,
        },
        placeholder: {
            type: GraphQLString,
        },
        fieldType: {
            type: GraphQLNonNull(GraphQLString),
        },
        fieldRequired: {
            type: GraphQLBoolean,
        },
        settings: {
            type: RegistrationQuestionSettingsType,
        },
    },
})

const RegistrationQuestionInput = new GraphQLInputObjectType({
    name: 'RegistrationQuestionInput',
    fields: {
        _id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
        },
        label: {
            type: GraphQLNonNull(GraphQLString),
        },
        hint: {
            type: GraphQLString,
        },
        placeholder: {
            type: GraphQLString,
        },
        fieldType: {
            type: GraphQLNonNull(GraphQLString),
        },
        fieldRequired: {
            type: GraphQLBoolean,
        },
        settings: {
            type: RegistrationQuestionSettingsInput,
        },
    },
})

module.exports = {
    mongoose: RegistrationQuestionSchema,
    graphql: RegistrationQuestionType,
    graphqlInput: RegistrationQuestionInput,
}
