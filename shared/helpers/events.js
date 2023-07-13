const EventStatuses = require('../constants/event-statuses')

const nowIsBefore = (time, moment) => {
    if (!time) {
        console.log('No time supplied to nowIsBefore')
    }

    const now = moment().utc()
    const timeMoment = moment(time).utc()

    return now.isBefore(timeMoment)
}

const nowIsBetween = (startTime, endTime, moment) => {
    if (!startTime) {
        console.log('No startTime supplied to nowIsBetween')
        return false
    }
    if (!endTime) {
        console.log('No endTime supplied to nowIsBetween')
        return false
    }
    const now = moment().utc()
    const startMoment = moment(startTime).utc()
    const endMoment = moment(endTime).utc()

    return now.isBetween(startMoment, endMoment)
}

const EventHelpers = {
    isRegistrationOpen: (event, moment) => {
        if (!event) return false
        return nowIsBetween(
            event.registrationStartTime,
            event.registrationEndTime,
            moment,
        )
    },
    isSubmissionsOpen: (event, moment) => {
        if (!event) return false
        return nowIsBetween(
            event.submissionsStartTime,
            event.submissionsEndTime,
            moment,
        )
    },
    isSubmissionsUpcoming: (event, moment) => {
        if (!event) return false
        return nowIsBefore(event.submissionsStartTime, moment)
    },
    isSubmissionsPast: (event, moment) => {
        if (!event) return false
        return !nowIsBefore(event.submissionsEndTime, moment)
    },
    isVotingOpen: (event, moment) => {
        if (!event) return false
        return nowIsBetween(
            event.reviewingStartTime,
            event.reviewingEndTime,
            moment,
        )
    },
    isFinalistVotingOpen: (event, moment) => {
        if (!event) return false
        return (
            nowIsBetween(event.reviewingEndTime, event.endTime, moment) &&
            event.finalsActive
        )
    },
    isVotingPast: (event, moment) => {
        if (!event) return true
        return !nowIsBefore(event.reviewingEndTime, moment)
    },
    isEventOngoing: (event, moment) => {
        if (!event) return false
        return nowIsBetween(event.startTime, event.endTime, moment)
    },
    isEventOver: (event, moment) => {
        if (!event) return false
        return !nowIsBefore(event.endTime, moment)
    },
    isGrantDeadlinePast: (event, moment) => {
        if (!event) return true
        return !nowIsBefore(
            moment(event.endTime).add(7, 'days').format(),
            moment,
        )
    },
    getEventStatus: (event, moment) => {
        if (!event) return null
        const now = moment().utc()

        if (now.isBefore(event.registrationStartTime)) {
            return EventStatuses.PUBLISHED.id
        }
        if (now.isBefore(event.registrationEndTime)) {
            return EventStatuses.REGISTRATION_OPEN.id
        }
        if (now.isBefore(event.endTime)) {
            if (now.isBefore(event.startTime)) {
                const eventBegins = moment(event.startTime).utc()
                if (eventBegins.diff(now, 'days') < 7) {
                    return EventStatuses.WEEK_OF_EVENT.id
                }
                return EventStatuses.REGISTRATION_ENDED.id
            }
            return EventStatuses.IN_PROGRESS.id
        }
        return EventStatuses.FINISHED.id
    },
    areMeetingsEnabled: event => {
        if (!event) return true
        return event.meetingsEnabled
    },
}

module.exports = EventHelpers
