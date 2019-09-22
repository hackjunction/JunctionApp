const _ = require('lodash');
const Promise = require('bluebird');
const { RegistrationStatuses } = require('@hackjunction/shared');
const Registration = require('./model');
const { NotFoundError, ForbiddenError } = require('../../common/errors/errors');
const UserProfileController = require('../user-profile/controller');
const RegistrationHelpers = require('./helpers');

const STATUSES = RegistrationStatuses.asObject;
const controller = {};

controller.getUserRegistrations = user => {
    return Registration.find({
        user: user.sub
    });
};

controller.createRegistration = (user, event, data) => {
    const answers = RegistrationHelpers.validateAnswers(data, event);
    const registration = new Registration({
        event: event._id.toString(),
        user: user.sub,
        answers
    });
    UserProfileController.updateUserProfile(answers, user.sub);
    return registration.save();
};

controller.getRegistration = (userId, eventId) => {
    return Registration.findOne({
        event: eventId,
        user: userId
    }).then(registration => {
        if (!registration) {
            throw new NotFoundError(`Registration for event ${eventId} not found for user ${userId}`);
        }
        return registration;
    });
};

controller.updateRegistration = (user, event, data) => {
    return controller.getRegistration(user.sub, event._id.toString()).then(registration => {
        const answers = RegistrationHelpers.validateAnswers(data, event);
        UserProfileController.updateUserProfile(answers, user.sub);
        return Registration.updateAllowed(registration, { answers });
    });
};

controller.confirmRegistration = (user, event) => {
    return controller.getRegistration(user.sub, event._id.toString()).then(registration => {
        if (registration.status === STATUSES.accepted.id) {
            registration.status = STATUSES.confirmed.id;
            return registration.save();
        }

        throw new ForbiddenError('Only accepted registrations can be confirmed');
    });
};

controller.cancelRegistration = (user, event) => {
    return controller.getRegistration(user.sub, event._id.toString()).then(registration => {
        if (registration.status === STATUSES.confirmed.id) {
            registration.status = STATUSES.cancelled.id;
            return registration.save();
        }

        throw new ForbiddenError('Only confirmed registrations can be cancelled');
    });
};

controller.getRegistrationsForEvent = eventId => {
    return Registration.find({
        event: eventId
    }).then(registrations => {
        /** Do some minor optimisation here to cut down on size */
        return registrations.map(reg => {
            reg.answers = _.mapValues(reg.answers, answer => {
                if (typeof answer === 'string' && answer.length > 50) {
                    return answer.slice(0, 10) + '...';
                }
                if (typeof answer === 'object' && Object.keys(answer).length > 0) {
                    return _.mapValues(answer, subAnswer => {
                        if (typeof subAnswer === 'string' && subAnswer.length > 50) {
                            return subAnswer.slice(0, 10);
                        }
                        return subAnswer;
                    });
                }
                return answer;
            });
            return reg;
        });
    });
};

controller.selfAssignRegistrationsForEvent = (eventId, userId) => {
    return Registration.find({
        rating: null,
        assignedTo: null
    })
        .sort({ createdAt: 'asc' })
        .limit(10)
        .then(registrations => {
            const registrationIds = registrations.map(r => r._id.toString());
            return Registration.updateMany(
                {
                    event: eventId,
                    _id: {
                        $in: registrationIds
                    }
                },
                {
                    assignedTo: userId
                }
            ).then(data => {
                return data.nModified;
            });
        });
};

controller.assignRegistrationForEvent = data => {
    if (!data.userId) throw new Error('Must pass userId when assigning reviewer');
    return Registration.findByIdAndUpdate(data.registrationId, {
        assignedTo: data.userId
    });
};

controller.bulkEditRegistrations = (eventId, registrationIds, edits) => {
    const cleanedEdits = _.pick(edits, ['status', 'tags', 'rating', 'assignedTo']);
    return Registration.updateMany(
        {
            event: eventId,
            _id: {
                $in: registrationIds
            }
        },
        cleanedEdits
    );
};

controller.getFullRegistration = (eventId, registrationId) => {
    return Registration.findById(registrationId).then(registration => {
        if (!registration || registration.event.toString() !== eventId) {
            throw new NotFoundError(`Registration with id ${registrationId} does not exist`);
        }

        return registration;
    });
};

controller.editRegistration = (registrationId, event, data, user) => {
    return controller.getFullRegistration(event._id.toString(), registrationId).then(registration => {
        registration.status = data.status;
        registration.rating = data.rating;
        registration.ratedBy = user.sub;
        registration.tags = data.tags;
        registration.assignedTo = data.assignedTo;
        return registration.save();
    });
};

controller.getFullRegistrationsForEvent = eventId => {
    return Registration.find({
        event: eventId
    });
};

controller.acceptSoftAccepted = async eventId => {
    const users = await Registration.find({ event: eventId, status: RegistrationStatuses.asObject.softAccepted.id });
    const accepted = await Promise.each(users, user => {
        user.status = RegistrationStatuses.asObject.accepted.id;
        user.save();
    });
    return accepted;
};

controller.rejectSoftRejected = async eventId => {
    const users = await Registration.find({ event: eventId, status: RegistrationStatuses.asObject.softRejected.id });
    const rejected = await Promise.each(users, user => {
        user.status = RegistrationStatuses.asObject.rejected.id;
        user.save();
    });
    return rejected;
};

module.exports = controller;
