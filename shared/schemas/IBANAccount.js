const mongoose = require('mongoose')
const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql')

const IBANAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    swift: {
        type: String,
        required: true,
    },
})

const IBANAccountType = new GraphQLObjectType({
    name: 'IBANAccount',
    fields: {
        accountNumber: {
            type: GraphQLNonNull(GraphQLString),
        },
        bankName: {
            type: GraphQLNonNull(GraphQLString),
        },
        swift: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: IBANAccountSchema,
    graphql: IBANAccountType,
}
