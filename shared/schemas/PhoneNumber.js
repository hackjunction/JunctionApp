const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')
const Countries = require('../constants/countries')

const mongooseSchema = new mongoose.Schema({
    countryCode: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return Countries.asArrayOfPhoneCodes.indexOf(v) !== -1
            },
            message: props => `${props.value} is not a valid phone code`,
        },
    },
    // TODO REMOVE THIS ONCE MIGRATIONS ARE DONE
    country_code: {
        type: String,
        required: true,
        validate: {
            validator(v) {
                return Countries.asArrayOfPhoneCodes.indexOf(v) !== -1
            },
            message: props => `${props.value} is not a valid phone code`,
        },
    },
    number: String,
})

const graphqlSchema = new GraphQLObjectType({
    name: 'PhoneNumber',
    fields: () => ({
        countryCode: {
            type: GraphQLNonNull(GraphQLString),
        },
        country_code: {
            type: GraphQLNonNull(GraphQLString),
        },
        number: {
            type: GraphQLNonNull(GraphQLString),
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
