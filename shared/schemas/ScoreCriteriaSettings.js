const mongoose = require('mongoose')
const {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLBoolean,
} = require('graphql')

const ScoreCriteriaSettingsSchema = new mongoose.Schema({
    scoreCriteria: {
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
    showScore: {
        type: Boolean,
        default: false,
    },
    showFeedback: {
        type: Boolean,
        default: false,
    },
})

const ScoreCriteriaSettingsType = new GraphQLObjectType({
    name: 'ScoreCriteriaSettings',
    fields: {
        scoreCriteria: {
            type: new GraphQLList(
                new GraphQLObjectType({
                    name: 'ScoreCriteria',
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
        showScore: {
            type: GraphQLBoolean,
        },
        showFeedback: {
            type: GraphQLBoolean,
        },
    },
})

const ScoreCriteriaSettingsInput = new GraphQLInputObjectType({
    name: 'ScoreCriteriaSettingsInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        scoreCriteria: {
            type: new GraphQLList(
                new GraphQLInputObjectType({
                    name: 'ScoreCriteriaInput',
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
        showScore: {
            type: GraphQLBoolean,
        },
        showFeedback: {
            type: GraphQLBoolean,
        },
    },
})

module.exports = {
    mongoose: ScoreCriteriaSettingsSchema,
    graphql: ScoreCriteriaSettingsType,
    graphqlInput: ScoreCriteriaSettingsInput,
}
