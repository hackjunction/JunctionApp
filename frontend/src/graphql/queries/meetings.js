/* eslint-disable react-hooks/rules-of-hooks */
import { gql, useQuery } from '@apollo/client'

export const MeetingFull = gql`
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

export const GET_MEETINGS = gql`
    query meetingSlots(
        $eventId: String!
        $challengeId: String!
        $from: Date
        $dayRange: Int
    ) {
        meetingSlots(
            eventId: $eventId
            challengeId: $challengeId
            from: $from
            dayRange: $dayRange
        ) {
            ...MeetingFull
        }
    }
    ${MeetingFull}
`
export const getMeetingslots = ({ eventId, challengeId, from, dayRange }) => {
    const { data, loading, error } = useQuery(GET_MEETINGS, {
        variables: {
            eventId,
            from,
            dayRange,
            challengeId,
        },
    })
    return [data?.meetingSlots, loading, error]
}
