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
        location
    }
`
export const MeetingRoomFull = gql`
    fragment MeetingRoomFull on MeetingRoom {
        _id
        name
        capacity
        timeSlots {
            _id
            start
            end
            reserved
        }
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
export const GET_MEETING_ROOMS = gql`
    query roomsByEvent($eventId: ID!) {
        roomsByEvent(eventId: $eventId) {
            ...MeetingRoomFull
        }
    }
    ${MeetingRoomFull}
`

export const getMeetingSlots = ({ eventId, challengeId, from, to }) => {
    const { data, loading, error, refetch } = useQuery(GET_MEETINGS, {
        variables: {
            eventId,
            from,
            to,
            challengeId,
        },
    })
    return [data?.meetingSlots, loading, error, refetch]
}

export const getMeetingRooms = ({ eventId }) => {
    const { data, loading, error } = useQuery(GET_MEETING_ROOMS, {
        variables: {
            eventId,
        },
    })
    return [data?.roomsByEvent, loading, error]
}

export const getMeetingSlotsWithPolling = ({
    eventId,
    challengeId,
    from,
    to,
}) => {
    const { data, loading, error } = useQuery(GET_MEETINGS, {
        pollInterval: 5000,
        variables: {
            eventId,
            from,
            to,
            challengeId,
        },
    })
    return [data?.meetingSlots, loading, error]
}
