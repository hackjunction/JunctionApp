const { gql, useMutation } = require('@apollo/client')

export const MeetingFullFragment = gql`
    fragment MeetingFull on Meeting {
        _id
        event
        attendees
        organizerEmail
        challenge
        title
        description
        startTime
        endTime
        timeZone
        googleMeetLink
    }
`

export const CREATE_MEETING_SLOT = gql`
    mutation createMeetingSlot($meeting: MeetingInput!) {
        createMeetingSlot(meeting: $meeting) {
            ...MeetingFull
        }
    }
    ${MeetingFullFragment}
`

export const BOOK_MEETING = gql`
    mutation bookMeeting($meetingId: String!, $attendees: [String!]!) {
        bookMeeting(meetingId: $meetingId, attendees: $attendees) {
            ...MeetingFull
        }
    }
    ${MeetingFullFragment}
`
