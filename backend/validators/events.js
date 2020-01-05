const fp = require('fastify-plugin')
const moment = require('moment-timezone')
const Shared = require('@hackjunction/shared')
const {
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
} = require('../common/errors/errors')

const { EventHelpers, RegistrationStatuses } = Shared

const EventController = require('../modules/event/controller')
const RegistrationController = require('../modules/registration/controller')
const TeamController = require('../modules/team/controller')

const hasUser = routeName => async request => {
    if (!request.user) {
        throw new Error(
            `${routeName} cannot be called before fastify.authenticate`
        )
    }
}

const hasEvent = routeName => async request => {
    if (request.event) return
    let event
    if (request.params.slug) {
        event = await EventController.getEventBySlug(request.params.slug)
        if (!event)
            throw new NotFoundError(
                `${request.raw.path} / ${routeName}: No event found with slug '${request.params.slug}'`
            )
    } else if (request.params.eventId) {
        event = await EventController.getEventBtId(request.params.eventId)
        if (!event)
            throw new NotFoundError(
                `${request.raw.path} / ${routeName}: No event found with _id '${request.params.eventId}'`
            )
    } else {
        throw new Error(
            `${routeName} cannot be called on a route without :slug or :eventId in the params`
        )
    }

    request.event = event
}

const hasRegistration = routeName => async request => {
    if (request.registration) return
    if (!request.event) {
        throw new Error(
            `${routeName}: hasRegistration cannot be called before hasEvent`
        )
    }

    if (!request.user) {
        throw new Error(
            `${routeName}: hasRegistration cannot be called before fastify.authenticate`
        )
    }
    const registration = await RegistrationController.getRegistration(
        request.user.sub,
        request.event._id
    )
    if (!registration) {
        throw new ForbiddenError(
            `${request.raw.path} / ${routeName}: User must be registered to this event`
        )
    }

    request.registration = registration
}

const hasTeam = routeName => async request => {
    if (request.team) return

    if (!request.user) {
        throw new Error(
            `${routeName}: hasTeam cannot be called before fastify.authenticate`
        )
    }

    if (!request.event) {
        throw new Error(
            `${routeName}: hasTeam cannot be called before hasEvent`
        )
    }

    const team = await TeamController.getTeam(
        request.event._id,
        request.user.sub
    )
    const teamPopulated = await TeamController.attachMeta(team)
    if (!teamPopulated) {
        throw new NotFoundError(`User must belong to a team for this event`)
    }

    request.team = teamPopulated
}

module.exports = fp(async fastify => {
    /** Check that the url parameters supplied correspond to an event,
     * and attach it to the request without performing any additional validation
     */
    fastify.decorate('events_attachEvent', async (request, reply) => {
        await hasEvent('fastify.events_attachEvent')(request)
    })

    /** Check that the user is an owner of the event */
    fastify.decorate('events_isOwner', async (request, reply) => {
        await hasUser('fastify.events_isOwner')(request)
        await hasEvent('fastfiy.events_isOwner')(request)
        const { event, user } = request

        if (event.owner !== user.sub) {
            throw new UnauthorizedError(
                `${request.user.sub} must be the owner of this event`
            )
        }
    })

    fastify.decorate('events_isOrganiser', async (request, reply) => {
        await hasUser('fastify.events_isOrganiser')(request)
        await hasEvent('fastify.events_isOrganiser')(request)
        const { event, user } = request

        if (
            event.owner !== user.sub &&
            event.organisers.indexOf(user.sub) === -1
        ) {
            throw new UnauthorizedError(
                `${user.sub} must be the owner or an organiser of this event`
            )
        }
    })

    fastify.decorate('events_canRegister', async (request, reply) => {
        await hasUser('fastify.events_canRegister')(request)
        await hasEvent('fastify.events_canRegister')(request)
        const { event } = request

        if (!event) {
            throw new NotFoundError('Event does not exist')
        }

        if (!EventHelpers.isRegistrationOpen(event, moment)) {
            return new ForbiddenError('Event registration is not open')
        }
    })

    fastify.decorate('events_isRegistrant', async (request, reply) => {
        await hasRegistration('fastify.events_isRegistrant')(request)
    })

    fastify.decorate('events_isTeamValid', async (request, reply) => {
        await hasTeam('fastify.events_isTeamValid')(request)
        const { team } = request

        const invalidTeamMembers = [team.owner]
            .concat(team.members)
            .map(userId => team.meta[userId])
            .filter(member => {
                return (
                    member.registration.status !==
                    RegistrationStatuses.asObject.checkedIn.id
                )
            })

        if (invalidTeamMembers.length > 0) {
            throw new ForbiddenError(
                `All team members must be checked in before you can submit a project`
            )
        }
    })

    fastify.decorate('events_isBefore', time => async (request, reply) => {
        await hasEvent(`events_isBefore(${time})`)(request)
        const now = moment().utc()

        switch (time) {
            case 'registrationEndTime': {
                if (now.isAfter(request.event.registrationEndTime)) {
                    throw new ForbiddenError(
                        'The registration period has passed'
                    )
                }
                break
            }
            case 'submissionsEndTime': {
                if (now.isAfter(request.event.submissionsEndTime)) {
                    throw new ForbiddenError(
                        'The submission deadline has passed'
                    )
                }
                break
            }
            default: {
                throw new Error(
                    `Invalid time ${time} supplied to isBefore validator`
                )
            }
        }
    })

    fastify.decorate('events_isAfter', time => async (request, reply) => {
        await hasEvent(`events_isAfter(${time})`)(request)
        const now = moment().utc()

        switch (time) {
            case 'registrationStartTime': {
                if (now.isBefore(request.event.registrationStartTime)) {
                    throw new ForbiddenError(
                        'The registration period has not yet begun'
                    )
                }
                break
            }
            case 'submissionsStartTime': {
                if (now.isBefore(request.event.submissionsStartTime)) {
                    throw new ForbiddenError(
                        'The submission period has not yet begun'
                    )
                }
                break
            }
            default: {
                throw new Error(
                    `Invalid time ${time} supplied to isAfter validator`
                )
            }
        }
    })
})
