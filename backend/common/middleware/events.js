const moment = require('moment-timezone');
const { NotFoundError, ForbiddenError, InsufficientPrivilegesError } = require('../errors/errors');
const Shared = require('@hackjunction/shared');

const { EventHelpers } = Shared;

const EventController = require('../../modules/event/controller');
const RegistrationController = require('../../modules/registration/controller');

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
