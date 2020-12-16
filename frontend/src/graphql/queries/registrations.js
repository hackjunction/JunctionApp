import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const Fragments = {
    RegistrationPreview: gql`
        fragment RegistrationPreview on Registration {
            _id
            status
            event {
                slug
                name
                coverImage {
                    publicId
                }
                _eventTimeFormatted
                _eventLocationFormatted
            }
        }
    `,
}

export const GET_REGISTRATIONS_BY_USER = gql`
    query Registration($userId: ID!) {
        registrationsByUser(userId: $userId) {
            ...RegistrationPreview
        }
    }
    ${Fragments.RegistrationPreview}
`

export const useRegistrationsByUser = userId => {
    const { data, loading, error } = useQuery(GET_REGISTRATIONS_BY_USER, {
        variables: {
            userId,
        },
    })

    return [data?.registrationsByUser, loading, error]
}
