import { gql } from '@apollo/client'

export const NEW_ALERTS_SUBSCRIPTION = gql`
    subscription newAlert($eventId: String, $slug: String) {
        newAlert(eventId: $eventId, slug: $slug) {
            eventId
            content
            sender
            sentAt
        }
    }
`
