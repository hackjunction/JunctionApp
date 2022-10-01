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
const RegistrationController = require('../registration/controller')
const Event = require('../event/model')

const pubsub = new RedisPubSub()

const AlertInput = new GraphQLInputObjectType({
    name: 'AlertInput',
    fields: {
        eventId: {
            type: GraphQLNonNull(GraphQLString),
        },
        content: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const AlertType = new GraphQLObjectType({
    name: 'Alert',
    fields: {
        id: {
            type: GraphQLID,
        },
        eventId: {
            type: GraphQLString,
        },
        content: {
            type: GraphQLString,
        },
        sender: {
            type: GraphQLString,
        },
        sentAt: {
            type: GraphQLDate,
        },
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        alerts: {
            type: GraphQLList(AlertType),
            args: {
                eventId: {
                    type: GraphQLNonNull(GraphQLString),
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        sendAlert: {
            type: AlertType,
            args: {
                alert: { type: GraphQLNonNull(AlertInput) },
            },
        },
    },
})

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        newAlert: {
            type: AlertType,
            args: {
                eventId: {
                    type: GraphQLString,
                },
                slug: {
                    type: GraphQLString,
                },
            },
        },
    },
})

const Resolvers = {
    Query: {
        alerts: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            await RegistrationController.getRegistration(userId, args.eventId)

            return context.controller('Alert').find(args, userId)
        },
    },
    Mutation: {
        sendAlert: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            const event = await Event.findById(args.alert.eventId)

            if (!event.organisers.includes(userId) && event.owner !== userId) {
                throw new Error('You are not an organiser of this event')
            }

            pubsub.publish('ALERT_SENT', {
                newAlert: {
                    ...args.alert,
                    sentAt: new Date(),
                    sender: userId,
                },
            })

            return context.controller('Alert').send(args.alert, userId)
        },
    },
    Subscription: {
        newAlert: {
            subscribe: withFilter(
                () => {
                    return pubsub.asyncIterator('ALERT_SENT')
                },
                async (_, { eventId, slug }, { user }) => {
                    // Check authentication from context
                    const userId = user ? user.sub : null
                    if (!userId) {
                        return false
                    }

                    const id = eventId || (await Event.findOne({ slug }))._id

                    // Find a registration for the user and event
                    const registration =
                        await RegistrationController.getRegistration(userId, id)
                    if (!registration) {
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
        AlertType,
    },
}
