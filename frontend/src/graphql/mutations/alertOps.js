import { gql } from '@apollo/client'

export const SEND_ALERT_MUTATION = gql`
    mutation SendAlert($input: AlertInput!) {
        sendAlert(alert: $input) {
            eventId
            content
            sender
            sentAt
        }
    }
`
