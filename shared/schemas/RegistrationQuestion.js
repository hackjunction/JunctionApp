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
    'single-choice',
    'multiple-choice',
    'checkbox',
]

const RegistrationQuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
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
        required: true,
        validate: {
            validator(v) {
                return FIELD_TYPES.indexOf(v) !== -1
            },
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
            required() {
                return (
                    ['single-choice', 'multiple-choice'].indexOf(
                        this.fieldType,
                    ) !== -1
                )
            },
        },
        default: {
            type: Boolean,
            default: false,
            required() {
                return ['boolean', 'checkbox'].indexOf(this.fieldType) !== -1
            },
        },
        maxSize: {
            type: Number,
        },
        allowedTypes: {
            type: [String],
        },
    },
})

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
