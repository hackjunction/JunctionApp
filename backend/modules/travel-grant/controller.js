const TravelGrant = require('./model');
const { InsufficientPrivilegesError, ForbiddenError, NotFoundError } = require('../../common/errors/errors');

const controller = {};

controller.getTravelGrantsForEvent = eventId => {
    return TravelGrant.find({ event: eventId });
};

controller.getTravelGrantForUser = (userId, eventId) => {
    return TravelGrant.findOne({ event: eventId, user: userId });
};

module.exports = controller;
