const _ = require('lodash')
const mongoose = require('mongoose')
const { GraphQLObjectType } = require('graphql')
const RegistrationFields = require('../constants/registration-fields')

const mongooseFields = {}
const graphqlFields = {}

_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    if (value.mongooseSchema) {
        mongooseFields[fieldName] = value.mongooseSchema
    }

    if (value.graphqlSchema) {
        graphqlFields[fieldName] = {
            type: value.graphqlSchema,
        }
    }
})

const AnswersSchema = new mongoose.Schema(mongooseFields)
const AnswersType = new GraphQLObjectType({
    name: 'Answers',
    fields: graphqlFields,
})

module.exports = {
    mongoose: AnswersSchema,
    graphql: AnswersType,
}
