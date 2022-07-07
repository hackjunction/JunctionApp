import moment from 'moment'
import EventConstants from 'constants/events'

const EventUtils = {
    getEventStatus: event => {
        const now = moment()

        if (now.isBefore(event.registrationStartTime)) {
            return EventConstants.STATUS.Published
        }

        if (now.isBefore(event.registrationEndTime)) {
            return EventConstants.STATUS.Registration
        }

        if (now.isBefore(event.startTime)) {
            return EventConstants.STATUS.Confirmation
        }

        if (now.isBefore(event.endTime)) {
            return EventConstants.STATUS.InProgress
        }

        return EventConstants.STATUS.Finished
    },
    getApprovedEventPageScripts: (event, pageId) => {
        return (
            event?.pageScripts.find(
                script => script.page === pageId && script.approved,
            )?.script || ''
        )
    },
}

export default EventUtils
