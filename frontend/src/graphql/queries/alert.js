import { gql } from '@apollo/client'

export const ALERTS_QUERY = gql`
    query alerts($eventId: String!) {
        alerts(eventId: $eventId) {
            content
            sender
            sentAt
        }
    }
`
