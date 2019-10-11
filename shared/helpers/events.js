const EventStatuses = require('../constants/event-statuses');

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
            return EventStatuses.PUBLISHED.id;
        } else if (now.isBefore(event.registrationEndTime)) {
            return EventStatuses.REGISTRATION_OPEN.id;
        } else if (now.isBefore(event.endTime)) {
            if (now.isBefore(event.startTime)) {
                const eventBegins = moment(event.startTime).utc();
                if (eventBegins.diff(now, 'days') < 7) {
                    return EventStatuses.WEEK_OF_EVENT;
                } else {
                    return EventStatuses.REGISTRATION_ENDED;
                }
            } else {
                return EventStatuses.IN_PROGRESS;
            }
        } else {
            return EventStatuses.FINISHED;
        }
    }
};

module.exports = EventHelpers;
