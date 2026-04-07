const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const Countries = require('../constants/countries')

const mongooseSchema = new mongoose.Schema({
    country: {
        type: String,
        validate: {
            validator: v => Countries.asArrayOfName.indexOf(v) !== -1,
            message: props => `${props.value} is not a valid country`,
        },
    },
    addressLine: {
        type: String,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    venueName: {
        type: String,
    },
}, { _id: false })

const graphqlInput = new GraphQLInputObjectType({
    name: 'AddressInput',
    fields: {
        _id: {
            type: GraphQLString,
        },
        country: {
            type: GraphQLNonNull(GraphQLString),
        },
        addressLine: {
            type: GraphQLNonNull(GraphQLString),
        },
        addressLine2: {
            type: GraphQLString,
        },
        city: {
            type: GraphQLNonNull(GraphQLString),
        },
        postalCode: {
            type: GraphQLNonNull(GraphQLString),
        },
        venueName: {
            type: GraphQLString,
        },
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        country: {
            type: GraphQLNonNull(GraphQLString),
        },
        addressLine: {
            type: GraphQLNonNull(GraphQLString),
        },
        addressLine2: {
            type: GraphQLString,
        },
        city: {
            type: GraphQLNonNull(GraphQLString),
        },
        postalCode: {
            type: GraphQLNonNull(GraphQLString),
        },
        venueName: {
            type: GraphQLString,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
    graphqlInput,
}
