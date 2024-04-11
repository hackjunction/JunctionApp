const moment = require('moment-timezone')
const Shared = require('@hackjunction/shared')
const bcrypt = require('bcrypt')
const Promise = require('bluebird')

const {
    NotFoundError,
    ForbiddenError,
    InsufficientPrivilegesError,
} = require('../errors/errors')

const { EventHelpers, RegistrationStatuses } = Shared

const EventController = require('../../modules/event/controller')
const RegistrationController = require('../../modules/registration/controller')
const TeamController = require('../../modules/team/controller')

function isSuperAdmin(user) {
    if (!user) {
        return new NotFoundError('User does not exist')
    }
    if (!user.roles.includes('SuperAdmin')) {
        return new InsufficientPrivilegesError('Must be owner a superadmin')
    }
    return null
}

function isOwner(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist')
    }
    if (event.owner !== user.sub) {
        return new InsufficientPrivilegesError('Must be owner of event')
    }
    return null
}

function isOrganiser(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist')
    }
    if (event.owner !== user.sub && event.organisers.indexOf(user.sub) === -1) {
        return new InsufficientPrivilegesError(
            'Must be owner or organiser of event',
        )
    }
    return null
}

function isPartner(user, event) {
    console.log('isPartner func running')
    if (!event) {
        return new NotFoundError('Event does not exist')
    }
    if (event.recruiters.length > 0) {
        const recruiterIds = event.recruiters.map(recruiter => {
            return recruiter.recruiterId
        })
        if (recruiterIds.indexOf(user.sub) === -1) {
            return new InsufficientPrivilegesError(
                'Must be partner in the of event',
            )
        }
    }
    return null
}

function canRegister(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist')
    }

    if (!EventHelpers.isRegistrationOpen(event, moment)) {
        return new ForbiddenError('Event registration is not open')
    }

    return null
}

function hasRegistered(event, registration) {
    if (!event) {
        return new NotFoundError('Event does not exist')
    }

    if (!registration) {
        return new ForbiddenError('You have not registered to the event')
    }

    return null
}

function canSubmitProject(event, registration, teamWithMeta) {
    if (!event) {
        return new NotFoundError('Event does not exist')
    }

    if (!registration) {
        return new ForbiddenError('You have not registered to the event')
    }

    if (registration.status !== RegistrationStatuses.asObject.checkedIn.id) {
        return new ForbiddenError(
            'You must be checked in to the event to submit a project',
        )
    }

    if (!teamWithMeta) {
        return new ForbiddenError(
            'You must belong to a team before submitting a project',
        )
    }
    const isTeamValid =
        [teamWithMeta.owner]
            .concat(teamWithMeta.members)
            .map(userId => {
                return teamWithMeta.meta[userId]
            })
            .filter(member => {
                if (
                    member.registration.status !==
                    RegistrationStatuses.asObject.checkedIn.id
                ) {
                    return true
                }
                return false
            }).length === 0

    if (!isTeamValid) {
        return new ForbiddenError(
            'All team members must have checked in before you can submit a project',
        )
    }

    return null
}

async function getEventFromParams(params) {
    let event
    if (params.slug) {
        event = await EventController.getEventBySlug(params.slug)
    } else if (params.eventId) {
        event = await EventController.getEventById(params.eventId)
    }
    return event
}

async function getRegistration(user, event) {
    return RegistrationController.getRegistration(
        user.sub,
        event._id.toString(),
    )
}

async function getTeamWithMeta(user, event) {
    try {
        const team = await TeamController.getTeam(event._id, user.sub)
        return TeamController.attachMeta(team)
    } catch (err) {
        return null
    }
}

async function hasPartnerToken(event, token) {
    /*     if (
        !event.challengesEnabled ||
        !event.challenges ||
        event.challenges.length === 0
    ) {
        throw new ForbiddenError('This event has no challenges')
    } */

    const ChallengeMatches = await Promise.filter(
        event.challenges,
        challenge => {
            return bcrypt.compare(challenge.slug, token)
        },
    )

    const TrackMatches = await Promise.filter(event.tracks, track => {
        return bcrypt.compare(track.slug, token)
    })
    const result = {
        challengeMatches: ChallengeMatches,
        trackMatches: TrackMatches,
    }
    // console.log(result)
    return result
}

const EventMiddleware = {
    getEventFromParams: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        req.event = event
        next()
    },
    isEventOrganiser: async (req, res, next) => {
        // TODO this method is called quite often. Not really problem here, but a reminder to run a profiler on the frontend at some point
        const event = await getEventFromParams(req.params)
        const superAdminError = isSuperAdmin(req.user)
        const error = isOrganiser(req.user, event)
        if (error && superAdminError) {
            next(error)
        } else {
            req.event = event
            next()
        }
    },
    isEventPartner: async (req, res, next) => {
        console.log('isEventPartner running')
        // TODO this method is called quite often. Not really problem here, but a reminder to run a profiler on the frontend at some point
        const event = await getEventFromParams(req.params)
        const superAdminError = isSuperAdmin(req.user)
        const error = isPartner(req.user, event)
        if (error && superAdminError) {
            next(error)
        } else {
            req.event = event
            next()
        }
    },
    isEventOwner: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        const superAdminError = isSuperAdmin(req.user)
        const error = isOwner(req.user, event)
        if (error && superAdminError) {
            next(error)
        } else {
            req.event = event
            next()
        }
    },
    canRegisterToEvent: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        const error = canRegister(req.user, event)
        if (error) {
            next(error)
        } else {
            req.event = event
            next()
        }
    },
    hasRegisteredToEvent: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        const registration = await getRegistration(req.user, event)
        const error = hasRegistered(event, registration)
        if (error) {
            next(error)
        } else {
            req.event = event
            req.registration = registration
            next()
        }
    },
    canSubmitProject: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        const [registration, team] = await Promise.all([
            getRegistration(req.user, event),
            getTeamWithMeta(req.user, event),
        ])
        const error = canSubmitProject(event, registration, team)
        if (error) {
            next(error)
        } else {
            req.event = event
            req.registration = registration
            req.team = team
            next()
        }
    },
    isOrganiserOrCanSubmitProject: async (req, res, next) => {
        const event = await getEventFromParams(req.params)
        const [registration, team] = await Promise.all([
            getRegistration(req.user, event),
            getTeamWithMeta(req.user, event),
        ])
        const superAdminError = isSuperAdmin(req.user)
        const organiserError = isOrganiser(req.user, event)
        const projectError = canSubmitProject(event, registration, team)
        if ((organiserError && superAdminError) && projectError) {
            next(error)
        } else {
            req.event = event
            req.registration = registration
            req.team = team
            next()
        }
    },
    hasPartnerToken: async (req, res, next) => {
        /*         const [match, ...other] = await hasPartnerToken(
            req.event,
            req.params.token,
        )

        if (other.length !== 0) {
            next(new ForbiddenError('Invalid token'))
        } */
        const match = await hasPartnerToken(req.event, req.params.token)
        if (Array.isArray(match.trackMatches) || match.trackMatches.length) {
            req.params.track = match.trackMatches
            return next()
        }
        if (
            Array.isArray(match.challengeMatches) ||
            match.challengeMatches.length
        ) {
            req.params.track = match.challengeMatches
            return next()
        }
    },

    /** Can only be called after req.event has been set by other middleware */
    isBefore: {
        submissionsEndTime: async (req, res, next) => {
            const now = moment().utc()

            if (now.isAfter(req.event.submissionsEndTime)) {
                next(new ForbiddenError('Submission deadline has passed.'))
            } else {
                next()
            }
        },
        /** TODO as needed */
    },
    isAfter: {
        submissionsStartTime: async (req, res, next) => {
            const now = moment().utc()

            if (now.isBefore(req.event.submissionsStartTime)) {
                next(new ForbiddenError('Submissions are not yet open'))
            } else {
                next()
            }
        },
        /** TODO as needed */
    },
}

module.exports = EventMiddleware
