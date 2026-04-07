const mongoose = require('mongoose')
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql')

// TODO implement recruiter roles and modify naming of recruiters to partners
const mongooseSchema = new mongoose.Schema({
    recruiterId: {
        type: String,

    },
    organization: {
        type: String,
        default: '',
    },
}, { _id: false })

const EventRecruitersType = new GraphQLObjectType({
    name: 'EventRecruiters',
    fields: {
        recruiterId: {
            type: GraphQLNonNull(GraphQLString),
        },
        organization: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const EventRecruitersInput = new GraphQLInputObjectType({
    name: 'EventRecruitersInput',
    fields: {
        recruiterId: {
            type: GraphQLNonNull(GraphQLString),
        },
        organization: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: EventRecruitersType,
    graphqlInput: EventRecruitersInput,
}
