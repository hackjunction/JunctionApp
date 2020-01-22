// const { gql } = require('apollo-server-express')
const { schemaComposer } = require('graphql-compose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const Event = require('./model')
// const EventController = require('./graphql-controller')
const dateUtils = require('../../common/utils/dateUtils')

/** Generate the base GraphQL typeDef from the corresponding mongoose model */
const customizationOptions = {}
const EventTC = composeWithMongoose(Event, customizationOptions)

/** Add some extra fields for convenience */
EventTC.addFields({
    eventLocationFormatted: {
        type: 'String',
        description: 'A formatted location description for the event',
        resolve: parent => {
            if (parent.eventType === 'physical') {
                return `${parent.eventLocation.city}, ${parent.eventLocation.country}`
            }
            return 'Online'
        },
    },
    eventTimeFormatted: {
        type: 'String',
        description: 'A formatted time description for the event',
        resolve: parent => {
            return dateUtils.formatDateInterval(
                parent.startTime,
                parent.endTime
            )
        },
    },
})

/** Add the queries we want to expose
 * TODO: Authorization for these
 */
schemaComposer.Query.addFields({
    eventById: EventTC.getResolver('findById'),
    events: EventTC.getResolver('findMany'),
})

module.exports = EventTC
