import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const Fragments = {
    EventPreview: gql`
        fragment EventPreview on Event {
            _id
            slug
            name
            galleryOpen
            coverImage {
                url
                publicId
            }
            eventType
            registrationStartTime
            registrationEndTime
            organizations
            _eventLocationFormatted
            _eventTimeFormatted
        }
    `,
}

export const GET_EVENT_PREVIEW = gql`
    query Event($_id: ID!) {
        eventById(_id: $_id) {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const useEventPreview = _id => {
    const { data, loading, error } = useQuery(GET_EVENT_PREVIEW, {
        variables: {
            _id,
        },
    })
    return [data?.eventById, loading, error]
}

export const GET_HIGHLIGHTED_EVENTS = gql`
    query Event($limit: Int, $name: String) {
        highlightedEvents(limit: $limit, name: $name) {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const useHighlightedEvents = ({ limit, name }) => {
    const { data, loading, error } = useQuery(GET_HIGHLIGHTED_EVENTS, {
        variables: {
            limit,
            name,
        },
    })

    return [data?.highlightedEvents, loading, error]
}

export const GET_ACTIVE_EVENTS = gql`
    query Event {
        activeEvents {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const useActiveEvents = ({ limit }) => {
    const { data, loading, error } = useQuery(GET_ACTIVE_EVENTS, {
        variables: {
            limit,
        },
    })

    return [data?.activeEvents, loading, error]
}

export const GET_PAST_EVENTS = gql`
    query Event($limit: Int) {
        pastEvents(limit: $limit) {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const usePastEvents = ({ limit }) => {
    const { data, loading, error } = useQuery(GET_PAST_EVENTS, {
        variables: {
            limit,
        },
    })

    return [data?.pastEvents, loading, error]
}

export const GET_MY_EVENTS = gql`
    query Event {
        myEvents {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const useMyEvents = () => {
    const { data, loading, error } = useQuery(GET_MY_EVENTS)

    return [data?.myEvents, loading, error]
}
