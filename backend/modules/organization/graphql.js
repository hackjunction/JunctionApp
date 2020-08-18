const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql')

const { CloudinaryImage } = require('../graphql-shared-types')

const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: () => {
        return {
            /** Fields from DB Model */
            _id: {
                type: GraphQLID,
            },
            name: {
                type: GraphQLString,
            },
            slug: {
                type: GraphQLString,
            },
            about: {
                type: GraphQLString,
            },
            link: {
                type: GraphQLString,
            },
            icon: {
                type: GraphQLString,
            },
        }
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        organizationById: {
            type: OrganizationType,
            args: {
                _id: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        organizationBySlug: {
            type: OrganizationType,
            args: {
                slug: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
        },
        organizations: {
            type: GraphQLList(OrganizationType),
        },
    },
})

const Resolvers = {
    Query: {
        /* TODO myOrganizations: */
        organizationById: async (parent, args, context) => {
            return context.controller('Organization').getById(args._id)
        },
        organizationBySlug: async (parent, args, context) => {
            return context.controller('Organization').getBySlug(args.slug)
        },
        organizations: (parent, args, context) => {
            return context.controller('Organization').getAll()
        },
    },
}

module.exports = {
    QueryType,
    Resolvers,
    Types: {
        OrganizationType,
    },
}
