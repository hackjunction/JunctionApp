const _ = require('lodash')
const { GraphQLObjectType } = require('graphql')
const RegistrationFields = require('../constants/registration-fields')

const graphqlFields = {}

_.forOwn(RegistrationFields.getFields(), (value, fieldName) => {
    if (value.copyToUserProfile && value.graphqlSchema) {
        graphqlFields[fieldName] = {
            type: value.graphqlSchema,
        }
    }
})

const UserProfileFieldsType = new GraphQLObjectType({
    name: 'UserProfileFields',
    fields: graphqlFields,
})

module.exports = {
    graphql: UserProfileFieldsType,
}
