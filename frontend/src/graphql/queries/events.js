import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const GET_EVENT_PREVIEW = gql`
    query Event($eventId: ID!) {
        eventById(eventId: $eventId) {
            id
            slug
            name
            coverImage {
                url
                publicId
            }
            eventLocationFormatted
            eventTimeFormatted
        }
    }
`

export const useEventPreview = eventId => {
    const { data, loading, error } = useQuery(GET_EVENT_PREVIEW, {
        variables: {
            eventId,
        },
    })

    return [data?.eventById, loading, error]
}
