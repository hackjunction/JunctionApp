import { gql } from '@apollo/client'

export const MY_MESSAGES_SUBSCRIPTION = gql`
    subscription MyMessages {
        newMessage {
            recipients
            content
            sender
            sentAt
            readAt
        }
    }
`
