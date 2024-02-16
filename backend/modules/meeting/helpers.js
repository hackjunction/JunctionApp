const Meeting = require('./model')

const updateMeetingGoogleInfo = async (
    meetingId,
    googleEventId,
    googleMeetLink,
) => {
    try {
        const meeting = await Meeting.findOne({ _id: meetingId })
        if (!meeting) return null
        meeting.googleEventId = googleEventId
        meeting.googleMeetLink = googleMeetLink
        return await meeting.save()
    } catch (err) {
        console.log('Failed to update meetign google info:', err)
        return null
    }
}

const cancelMeeting = async meetingId => {
    try {
        const meeting = await Meeting.findOne({ _id: meetingId })
        if (!meeting) return null
        meeting.googleEventId = null
        meeting.googleMeetLink = null
        meeting.attendees = []
        return await meeting.save()
    } catch (err) {
        console.log('Failed to update meetign google info:', err)
        return null
    }
}

module.exports = {
    updateMeetingGoogleInfo,
    cancelMeeting,
}
