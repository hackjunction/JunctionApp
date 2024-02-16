import { gql } from '@apollo/client'

export const SEND_MESSAGE_MUTATION = gql`
    mutation SendMessage($input: MessageInput!) {
        sendMessage(message: $input) {
            recipients
            content
            sender
            sentAt
            readAt
        }
    }
`
