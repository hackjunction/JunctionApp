// const {
//     GraphQLObjectType,
//     GraphQLID,
//     GraphQLString,
//     GraphQLNonNull,
//     GraphQLList,
//     GraphQLBoolean,
// } = require('graphql')

// const { EventType } = require('../event/graphql')

// const { TeamRole } = require('../graphql-shared-types')

// const TeamType = new GraphQLObjectType({
//     name: 'Team',
//     fields: () => ({
//         event: {
//             type: EventType,
//         },
//         owner: {
//             type: GraphQLString,
//         },
//         members: {
//             type: GraphQLList(GraphQLString),
//         },
//         code: {
//             type: GraphQLString,
//         },
//         complete: {
//             type: GraphQLBoolean,
//         },
//         // new
//         roles: {
//             type: GraphQLList(TeamRole),
//         },
//         name: {
//             type: GraphQLString,
//         },
//         tagline: {
//             type: GraphQLString,
//         },
//         description: {
//             type: GraphQLString,
//         },
//         links: {
//             type: GraphQLList(GraphQLString),
//         },
//     }),
// })

// const QueryType = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         myTeam: {
//             type: TeamType,
//         },
//     },
// })

// const Resolvers = {
//     Query: {
//         myTeam: async (parent, args, context) => {
//             const userId = context.req.user ? context.req.user.sub : null
//             const eventId = context.req.event ? context.req.event._id : null
//             return context.controller('Team').getTeam(eventId, userId)
//         },
//     },
// }

// module.exports = {
//     QueryType,
//     Resolvers,
//     Types: {
//         TeamType,
//     },
// }
