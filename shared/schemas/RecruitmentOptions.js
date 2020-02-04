const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require('graphql')
const Misc = require('../constants/misc')

const mongooseSchema = new mongoose.Schema({
    status: {
        type: String,
        validate: {
            validator(v) {
                return v in Misc.recruitmentStatuses.items
            },
            message: () =>
                `Status must be one of ${Object.keys(
                    Misc.recruitmentStatuses.items
                ).join(', ')}`,
        },
    },
    consent: {
        type: Boolean,
        default: false,
    },
    relocation: {
        type: String,
        validate: {
            validator(v) {
                return v in Misc.relocationOptions.items
            },
            message: () =>
                `Relocation must be one of ${Object.keys(
                    Misc.relocationOptions.items
                ).join(', ')}`,
        },
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'RecruitmentOptions',
    fields: () => ({
        status: {
            type: GraphQLString,
        },
        consent: {
            type: GraphQLBoolean,
        },
        relocation: {
            type: GraphQLString,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
