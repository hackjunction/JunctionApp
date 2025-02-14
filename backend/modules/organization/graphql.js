const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType,
} = require('graphql')

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

const graphqlInput = new GraphQLInputObjectType({
    name: 'OrganizationInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        slug: {
            type: new GraphQLNonNull(GraphQLString),
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
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        organizationById: {
            type: OrganizationType,
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLID),
                },
            },
        },
        organizationBySlug: {
            type: OrganizationType,
            args: {
                slug: {
                    type: new GraphQLNonNull(GraphQLString),
                },
            },
        },
        organizations: {
            type: new GraphQLList(OrganizationType),
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

// You can have multiple types
module.exports = {
    QueryType,
    Resolvers,
    OrganizationType,
    graphqlInput,
}
