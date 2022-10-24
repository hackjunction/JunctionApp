const { GraphQLBoolean } = require('graphql')
const { withFilter } = require('graphql-subscriptions')
const { RedisPubSub } = require('graphql-redis-subscriptions')
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')
const Redis = require('ioredis')
const options = {
    username: 'default',
    password: global.gConfig.REDIS_PASSWORD,
    host: 'redis-11912.c226.eu-west-1-3.ec2.cloud.redislabs.com',
    port: 11912,
}

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
})
const MessageInput = new GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
        recipients: {
            type: GraphQLNonNull(GraphQLList(GraphQLString)),
        },
        content: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: {
        id: {
            type: GraphQLID,
        },
        recipients: {
            type: GraphQLList(GraphQLString),
        },
        content: {
            type: GraphQLString,
        },
        sender: {
            type: GraphQLString,
        },
        readAt: {
            type: GraphQLDate,
        },
        sentAt: {
            type: GraphQLDate,
        },
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        messages: {
            type: GraphQLList(MessageType),
            args: {
                recipients: {
                    type: GraphQLList(GraphQLString),
                },
                read: {
                    type: GraphQLBoolean,
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        sendMessage: {
            type: MessageType,
            args: {
                message: { type: GraphQLNonNull(MessageInput) },
            },
        },
        readMessage: {
            type: MessageType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        readMany: {
            type: GraphQLList(MessageType),
            args: {
                ids: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
            },
        },
    },
})

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        newMessage: {
            type: MessageType,
        },
    },
})

const Resolvers = {
    Query: {
        messages: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').find(args, userId)
        },
    },
    Mutation: {
        sendMessage: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            pubsub.publish('MESSAGE_SENT', {
                newMessage: {
                    ...args.message,
                    sentAt: new Date(),
                    sender: userId,
                },
            })

            return context.controller('Message').send(args.message, userId)
        },
        readMessage: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').read(args.id, userId)
        },
        readMany: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').readMany(args.ids, userId)
        },
    },
    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => {
                    return pubsub.asyncIterator('MESSAGE_SENT')
                },
                ({ newMessage }, _, { user }) => {
                    // Check authentication from context
                    const userId = user ? user.sub : null
                    if (!userId) {
                        return false
                    }

                    // Check that user is a recipient
                    if (!newMessage.recipients.includes(userId)) {
                        return false
                    }
                    return true
                },
            ),
        },
    },
}

module.exports = {
    QueryType,
    MutationType,
    SubscriptionType,
    Resolvers,
    Types: {
        MessageType,
    },
}
