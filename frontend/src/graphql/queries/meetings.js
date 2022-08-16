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
        $to: Date
    ) {
        meetingSlots(
            eventId: $eventId
            challengeId: $challengeId
            from: $from
            to: $to
        ) {
            ...MeetingFull
        }
    }
    ${MeetingFull}
`
export const getMeetingslots = ({ eventId, challengeId, from, to }) => {
    const { data, loading, error } = useQuery(GET_MEETINGS, {
        variables: {
            eventId,
            from,
            to,
            challengeId,
        },
    })
    return [data?.meetingSlots, loading, error]
}
