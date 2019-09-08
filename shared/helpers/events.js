const EventConstants = require('../constants/events');

const EventHelpers = {
    isRegistrationOpen: (event, moment) => {
        if (!event) return false;
        const now = moment().utc();
        const registrationStarts = moment(event.registrationStartTime).utc();
        const registrationEnds = moment(event.registrationEndTime).utc();

        return now.isBetween(registrationStarts, registrationEnds);
    },
    getEventStatus: (event, moment) => {
        if (!event) return null;
        const now = moment().utc();

        if (now.isBefore(event.registrationStartTime)) {
            return EventConstants.status.REGISTRATION_UPCOMING.id;
        } else if (now.isBefore(event.registrationEndTime)) {
            return EventConstants.status.REGISTRATION_OPEN.id;
        } else {
            return EventConstants.status.REGISTRATION_CLOSED.id;
        }
    },
    validations: {
        firstName: (validateJS, required) => value =>
            validateJS.single(value, { minimum: 0, maximum: 100, type: 'string' }),
        lastName: (validateJS, required) => value =>
            validateJS.single(value, { minimum: 0, maximum: 100, type: 'string' }),
        email: (validateJS, required) => value =>
            validateJS.single(value, { email: true, presence: { allowEmpty: !required } }),
        dateOfBirth: (validateJS, required) => value =>
            validateJS.single(value, { dateOnly: true, presence: { allowEmpty: !required } })
    }
};

module.exports = EventHelpers;
