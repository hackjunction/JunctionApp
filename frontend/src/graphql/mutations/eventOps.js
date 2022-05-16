import { gql } from '@apollo/client'

const Fragments = {
    EventFull: gql`
        fragment EventFull on Event {
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

export const UPDATE_EVENT = gql`
    mutation UpdateEvent($_id: ID!, $input: EventInput!) {
        updateEvent(_id: $_id, event: $input) {
            ...EventFull
        }
    }
    ${Fragments.EventFull}
`
