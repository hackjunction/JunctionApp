const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')
const Skills = require('../constants/skills')

const mongooseSchema = new mongoose.Schema({
    skill: {
        type: String,
        validate: {
            validator(v) {
                return Skills.items.indexOf(v) !== -1
            },
            message: props => `${props.value} is not a valid skill`,
        },
    },
    level: {
        type: Number,
        min: 1,
        max: 5,
    },
})

const graphqlSchema = new GraphQLObjectType({
    name: 'Skill',
    fields: () => ({
        skill: {
            type: GraphQLString,
        },
        level: {
            type: GraphQLInt,
        },
    }),
})

module.exports = {
    mongoose: mongooseSchema,
    graphql: graphqlSchema,
}
