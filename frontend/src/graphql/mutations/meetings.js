const { gql } = require('@apollo/client')

const Fragments = {
    MeetingFull: gql`
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
    `,
}

export const CREATE_MEETING_SLOT = gql`
    mutation createMeetingSlot($meeting: MeetingInput!) {
        createMeetingSlot(meeting: $meeting) {
            ...MeetingFull
        }
    }
    ${Fragments.MeetingFull}
`
