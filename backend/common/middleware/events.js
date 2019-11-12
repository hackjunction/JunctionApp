const moment = require('moment-timezone');
const { NotFoundError, ForbiddenError, InsufficientPrivilegesError } = require('../errors/errors');
const Shared = require('@hackjunction/shared');

const { EventHelpers, RegistrationStatuses } = Shared;

const EventController = require('../../modules/event/controller');
const RegistrationController = require('../../modules/registration/controller');
const TeamController = require('../../modules/team/controller');

function isOwner(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist');
    }

    if (event.owner !== user.sub) {
        return new InsufficientPrivilegesError('Must be owner of event');
    }

    return null;
}

function isOrganiser(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist');
    }

    if (event.owner !== user.sub && event.organisers.indexOf(user.sub) === -1) {
        return new InsufficientPrivilegesError('Must be owner or organiser of event');
    }

    return null;
}

function canRegister(user, event) {
    if (!event) {
        return new NotFoundError('Event does not exist');
    }

    if (!EventHelpers.isRegistrationOpen(event, moment)) {
        return new ForbiddenError('Event registration is not open');
    }

    return null;
}

function hasRegistered(event, registration) {
    if (!event) {
        return new NotFoundError('Event does not exist');
    }

    if (!registration) {
        return new ForbiddenError('You have not registered to the event');
    }

    return null;
}

function canSubmitProject(event, registration, team) {
    if (!event) {
        return new NotFoundError('Event does not exist');
    }

    if (!registration) {
        return new ForbiddenError('You have not registered to the event');
    }

    if (registration.status !== RegistrationStatuses.asObject.checkedIn.id) {
        return new ForbiddenError('You must be checked in to the event to submit a project');
    }

    if (!EventHelpers.isSubmissionsOpen(event, moment)) {
        return new ForbiddenError('Event submissions are not open');
    }

    if (!team) {
        //TODO: Check if team is valid? (e.g. everyone has checked in)
        return new ForbiddenError('You must belong to a team before submitting a project');
    }

    return null;
}

async function getEventFromParams(params) {
    let event;
    if (params.slug) {
        event = await EventController.getEventBySlug(params.slug);
    } else if (params.eventId) {
        event = await EventController.getEventById(params.eventId);
    }
    return event;
}

async function getRegistration(user, event) {
    return RegistrationController.getRegistration(user.sub, event._id.toString());
}

async function getTeam(user, event) {
    return TeamController.getTeam(event._id.toString(), user.sub);
}

const EventMiddleware = {
    isEventOrganiser: async (req, res, next) => {
        const event = await getEventFromParams(req.params);
        const error = isOrganiser(req.user, event);
        if (error) return next(error);
        req.event = event;
        next();
    },
    isEventOwner: async (req, res, next) => {
        const event = await getEventFromParams(req.params);
        const error = isOwner(req.user, event);
        if (error) return next(error);
        req.event = event;
        next();
    },
    canRegisterToEvent: async (req, res, next) => {
        const event = await getEventFromParams(req.params);
        const error = canRegister(req.user, event);
        if (error) return next(error);
        req.event = event;
        next();
    },
    hasRegisteredToEvent: async (req, res, next) => {
        const event = await getEventFromParams(req.params);
        const registration = await getRegistration(req.user, event);
        const error = hasRegistered(event, registration);
        if (error) return next(error);
        req.event = event;
        req.registration = registration;
        next();
    },
    canSubmitProject: async (req, res, next) => {
        const event = await getEventFromParams(req.params);
        const [registration, team] = await Promise.all([getRegistration(req.user, event), getTeam(req.user, event)]);
        const error = canSubmitProject(event, registration, team);
        if (error) return next(error);
        req.event = event;
        req.registration = registration;
        req.team = team;
        next();
    },
    /** Can only be called after req.event has been set by other middleware */
    isBefore: {
        submissionsEndTime: async (req, res, next) => {
            const now = moment().utc();

            if (now.isAfter(req.event.submissionsEndTime)) {
                next(new ForbiddenError('Submission deadline has passed.'));
            } else {
                next();
            }
        }
    },
    isAfter: {
        /** TODO as needed */
    }
};

module.exports = EventMiddleware;
