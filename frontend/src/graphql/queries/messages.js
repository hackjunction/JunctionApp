import { gql } from '@apollo/client'

export const MY_MESSAGES_QUERY = gql`
    query MyMessages {
        messages {
            recipients
            content
            sender
            sentAt
            readAt
        }
    }
`
