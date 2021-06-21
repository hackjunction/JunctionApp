import { gql, useQuery } from '@apollo/client'

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
            startTime
            registrationStartTime
            registrationEndTime
            organizations {
                name
                slug
                about
                link
                icon
            }
            published
            approved
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
    query Event($limit: Int) {
        highlightedEvents(limit: $limit) {
            ...EventPreview
        }
    }
    ${Fragments.EventPreview}
`

export const useHighlightedEvents = ({ limit }) => {
    const { data, loading, error } = useQuery(GET_HIGHLIGHTED_EVENTS, {
        variables: {
            limit,
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
// TODO: usePastEvents limit is conditional in backend
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
