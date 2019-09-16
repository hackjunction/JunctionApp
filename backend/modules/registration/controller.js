const _ = require('lodash');
const moment = require('moment');

const Registration = require('./model');
const { NotFoundError } = require('../../common/errors/errors');
const UserProfileController = require('../user-profile/controller');
const RegistrationHelpers = require('./helpers');
const { RegistrationStatuses } = require('@hackjunction/shared');

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

controller.getRegistrationsForEvent = eventId => {
    return Registration.find(
        {
            event: eventId
        },
        {
            user: 1,
            rating: 1,
            ratedBy: 1,
            status: 1,
            'answers.email': 1,
            'answers.firstName': 1,
            'answers.lastName': 1
        }
    );
};

controller.searchRegistrationsForEvent = (eventId, userId, params) => {
    const aggregationSteps = RegistrationHelpers.buildAggregation(eventId, userId, params);
    return Registration.aggregate(aggregationSteps);
};

controller.selfAssignRegistrationsForEvent = (eventId, userId) => {
    return Registration.find({
        rating: {
            $exists: false
        },
        assignedTo: {
            $exists: false
        }
    })
        .sort([['createdAt', -1]])
        .limit(10)
        .then(registrations => {
            const updates = registrations.map(reg => {
                return {
                    updateOne: {
                        filter: {
                            _id: reg._id
                        },
                        update: {
                            assignedTo: userId
                        }
                    }
                };
            });

            if (updates.length === 0) {
                return 0;
            }

            return Registration.bulkWrite(updates).then(data => {
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

controller.getFullRegistration = (eventId, registrationId) => {
    return Registration.findById(registrationId).then(registration => {
        if (!registration || registration.event.toString() !== eventId) {
            throw new NotFoundError(`Registration with id ${registrationId} does not exist`);
        }

        return registration;
    });
};

controller.rateRegistration = (registrationId, event, user, rating) => {
    return controller.getFullRegistration(event._id.toString(), registrationId).then(registration => {
        registration.rating = rating;
        registration.ratedBy = user.sub;
        return registration.save();
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

controller.acceptRegistration = (registrationId, event) => {
    return controller.getFullRegistration(event._id.toString(), registrationId).then(registration => {
        registration.status = RegistrationStatuses.asObject.accepted.id;
        return registration.save();
    });
};

controller.rejectRegistration = (registrationId, event) => {
    return controller.getFullRegistration(event._id.toString(), registrationId).then(registration => {
        registration.status = RegistrationStatuses.asObject.rejected.id;
        return registration.save();
    });
};

controller.getFullRegistrationsForEvent = eventId => {
    return Registration.find({
        event: eventId
    });
};

controller.getRegistrationStatsForEvent = async eventId => {
    const registrations = await Registration.find({ event: eventId }, [
        'answers.firstName',
        'answers.lastName',
        'answers.secretCode',
        'rating',
        'ratedBy',
        'createdAt'
    ]);

    const registrationsByDay = _.countBy(registrations, r => moment(r.createdAt).format('YYYY-MM-DD'));

    const numRegistrations = registrations.length;
    const numRegistrationsLastDay = registrations.filter(r => {
        return Date.now() - r.createdAt < 24 * 60 * 60 * 1000;
    }).length;
    const reviewedRegistrations = registrations.filter(r => {
        return !isNaN(r.rating);
    });
    const registrationsByReviewer = _.countBy(reviewedRegistrations, r => r.ratedBy);
    const numRegistrationsReviewed = reviewedRegistrations.length;
    const registrationsLastFive = _.sortBy(registrations, r => r.createdAt).slice(-5);
    const topSecretCodes = _.countBy(registrations, r => r.answers.secretCode);
    const topSecretCodesArray = [];
    _.forOwn(topSecretCodes, (count, code) => {
        if (!_.isEmpty(code) && code !== 'undefined') {
            topSecretCodesArray.push({
                code,
                count
            });
        }
    });

    const registrationsAvgRating = _.meanBy(reviewedRegistrations, 'rating');
    const registrationsSplit = _.countBy(reviewedRegistrations, 'rating');

    return {
        numRegistrations,
        numRegistrationsLastDay,
        numRegistrationsReviewed,
        registrationsByDay,
        registrationsByReviewer,
        registrationsAvgRating,
        registrationsLastFive,
        registrationsSplit,
        registrationsTopSecretCodes: _.sortBy(topSecretCodesArray, item => item.count * -1)
    };
};

module.exports = controller;
