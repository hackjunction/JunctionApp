import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const GET_REGISTRATIONS_BY_USER = gql`
    query Registration($userId: ID!) {
        registrationsByUser(userId: $userId) {
            _id
            event
        }
    }
`

export const useRegistrationsByUser = userId => {
    const { data, loading, error } = useQuery(GET_REGISTRATIONS_BY_USER, {
        variables: {
            userId,
        },
    })

    return [data?.registrationsByUser, loading, error]
}
