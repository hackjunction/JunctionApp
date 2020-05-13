const _ = require('lodash')
const { ReviewingMethods } = require('@hackjunction/shared')
const Event = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.getPublicEvents = () => {
    return Event.find({
        published: true,
    })
}

controller.getPublicEventBySlug = slug => {
    return Event.findOne({
        published: true,
        slug,
    })
}

controller.getPublicEventById = id => {
    return Event.findById(id).then(event => {
        if (!event.published) {
            throw new NotFoundError(
                `Event with slug ${event.slug} does not exist`
            )
        }
        return event
    })
}

controller.getEventBySlug = slug => {
    return Event.findOne({ slug })
}

controller.getEventById = id => {
    return Event.findById(id)
}

controller.createEvent = (eventData, user) => {
    const event = new Event({
        name: eventData.name,
        owner: user.sub,
    })
    return event.save()
}

controller.updateEvent = (event, eventData) => {
    return Event.updateAllowed(event, eventData)
}

controller.addOrganiser = (event, organiserId) => {
    event.organisers = _.concat(event.organisers, organiserId)
    return event.save()
}

controller.removeOrganiser = (event, organiserId) => {
    event.organisers = _.filter(event.organisers, id => id !== organiserId)
    return event.save()
}

controller.getEventsByOrganiser = user => {
    return Event.find().or([{ owner: user.sub }, { organisers: user.sub }])
}

controller.deleteEventBySlug = slug => {
    return controller.getEventBySlug(slug).then(event => {
        if (!event) {
            throw new NotFoundError(`Event with slug ${slug} does not exist`)
        }
        return event.remove()
    })
}

controller.updateWinners = (eventId, winners) => {
    return Event.findById(eventId).then(event => {
        event.winners = winners
        return event.save()
    })
}

controller.generateTrackPlacementAchievements = async event => {
    // If the event is not using tracks, get outta here
    if (!event.tracksEnabled) {
        return
    }
    // TODO: Regenerate achievements for track placements
    // - Depends on which reviewing method is used
    switch (event.reviewMethod) {
        case ReviewingMethods.gavelPeerReview.id: {
            return 'foo'
        }
        default:
            return 'bar'
    }
}

controller.generateChallengeAchievements = async event => {
    // If the event is not using challenges, get outta here
    if (!event.challengesEnabled) {
    }
    // TODO: Regenerate achievements for challenge placements
}

controller.generateOverallPlacementAchievements = async event => {
    // TODO: Regenerate overall placement achievements
    // - Depends on which reviewing method is used
    // - Depends on if the event is using tracks or not
    // - Depends on if there is a finalist round or not
}

controller.generateAchievements = async event => {
    // Generate these achievements in the background, and just return the response
    Promise.each([
        controller.generateTrackPlacementAchievements(event),
        controller.generateChallengeAchievements(event),
        controller.generateOverallPlacementAchievements(event),
    ])
}

module.exports = controller
