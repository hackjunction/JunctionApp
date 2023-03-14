const { gql } = require('@apollo/client')

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

export const MEETINGS_BULK_ACTION = gql`
    mutation meetingSlotsBulkAction($create: [MeetingInput!], $delete: [ID!]) {
        meetingSlotsBulkAction(create: $create, delete: $delete) {
            created {
                ...MeetingFull
            }
            deleted {
                deletedCount
            }
        }
    }
    ${MeetingFullFragment}
`

export const BOOK_MEETING = gql`
    mutation bookMeeting(
        $meetingId: String!
        $attendees: [String!]!
        $location: String
    ) {
        bookMeeting(
            meetingId: $meetingId
            attendees: $attendees
            location: $location
        ) {
            ...MeetingFull
        }
    }
    ${MeetingFullFragment}
`

export const CANCEL_MEETING = gql`
    mutation cancelMeeting($meetingId: String!) {
        cancelMeeting(meetingId: $meetingId) {
            ...MeetingFull
        }
    }
    ${MeetingFullFragment}
`
