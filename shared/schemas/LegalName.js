const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql')

const LegalNameSchema = new mongoose.Schema({
    firstName: {

        type: String,
    },
    middleName: {

        type: String,
    },
    lastName: {

        type: String,
    },
}, { _id: false })

const LegalNameType = new GraphQLObjectType({
    name: 'LegalName',
    fields: {
        firstName: {
            type: GraphQLNonNull(GraphQLString),
        },
        middleName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: LegalNameSchema,
    graphql: LegalNameType,
}
