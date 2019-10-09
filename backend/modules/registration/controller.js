const _ = require('lodash');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const { RegistrationStatuses, RegistrationFields, FieldTypes } = require('@hackjunction/shared');
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
            reg.answers = _.mapValues(reg.answers, (answer, field) => {
                const fieldType = RegistrationFields.getFieldType(field);
                switch (fieldType) {
                    case FieldTypes.LONG_TEXT.id:
                        if (answer && answer.length > 10) {
                            return answer.slice(0, 10) + '...';
                        }
                        return answer;
                    default: {
                        if (typeof answer === 'object' && !Array.isArray(answer) && Object.keys(answer).length > 0) {
                            return _.mapValues(answer, subAnswer => {
                                if (typeof subAnswer === 'string' && subAnswer.length > 50) {
                                    return subAnswer.slice(0, 10);
                                }
                                return subAnswer;
                            });
                        }
                        return answer;
                    }
                }
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
    const cleanedEdits = _.pick(edits, ['status', 'tags', 'rating', 'assignedTo', 'travelGrant']);
    return Registration.find({
        event: eventId,
        user: {
            $in: registrationIds
        }
    }).then(registrations => {
        const updates = registrations
            .map(registration => {
                let edits = _.cloneDeep(cleanedEdits);
                if (edits.hasOwnProperty('status')) {
                    const status = RegistrationStatuses.asObject[registration.status];
                    if (status && !status.allowEdit) {
                        delete edits.status;
                    }
                }

                if (edits.hasOwnProperty('tags')) {
                    edits.tags = _.uniq((registration.tags || []).concat(edits.tags));
                }

                if (Object.keys(edits).length === 0) return null;

                return {
                    updateOne: {
                        filter: {
                            _id: registration._id
                        },
                        update: edits
                    }
                };
            })
            .filter(edit => edit !== null);

        return Registration.bulkWrite(updates);
    });
};

controller.bulkAssignTravelGrants = (eventId, grants) => {
    const updates = grants.map(({ _id, amount }) => {
        return Registration.findById(_id).then(reg => {
            reg.travelGrant = amount;
            return reg.save();
        });
    });

    return Promise.all(updates);
};

controller.rejectPendingTravelGrants = eventId => {
    return Registration.find({
        event: eventId,
        status: {
            $in: ['confirmed', 'checkedIn']
        },
        travelGrant: {
            $exists: false
        },
        'answers.needsTravelGrant': true
    }).then(registrations => {
        const promises = registrations.map(registration => {
            registration.travelGrant = 0;
            return registration.save();
        });

        return Promise.all(promises);
    });
};

controller.getFullRegistration = (eventId, registrationId) => {
    const query =
        mongoose.Types.ObjectId.isValid(registrationId) && registrationId.indexOf('|') === -1
            ? { _id: registrationId }
            : { user: registrationId };
    return Registration.findOne(query)
        .and({ event: eventId })
        .then(registration => {
            if (!registration) {
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
        registration.travelGrant = data.travelGrant;
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
