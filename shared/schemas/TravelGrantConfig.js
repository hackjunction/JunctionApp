const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLInputObjectType,
} = require('graphql')
const Currencies = require('../constants/currencies')

const TravelGrantConfigSchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    budget: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: true,
        default: 'EUR',
        validate: {
            validator(v) {
                return Currencies.keys.indexOf(v) !== -1
            },
            message: props => `${props.value} is not a valid currency code`,
        },
    },
})

const TravelGrantConfigType = new GraphQLObjectType({
    name: 'TravelGrantConfig',
    fields: {
        enabled: {
            type: GraphQLNonNull(GraphQLBoolean),
        },
        budget: {
            type: GraphQLNonNull(GraphQLInt),
        },
        currency: {
            type: GraphQLString,
        },
    },
})

const TravelGrantConfigInput = new GraphQLInputObjectType({
    name: 'TravelGrantConfigInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        enabled: {
            type: GraphQLNonNull(GraphQLBoolean),
        },
        budget: {
            type: GraphQLNonNull(GraphQLInt),
        },
        currency: {
            type: GraphQLString,
        },
    },
})

module.exports = {
    mongoose: TravelGrantConfigSchema,
    graphql: TravelGrantConfigType,
    graphqlInput: TravelGrantConfigInput,
}
