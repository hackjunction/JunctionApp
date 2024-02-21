import { gql, useQuery } from '@apollo/client'

const Fragments = {
    RegistrationPreview: gql`
        fragment RegistrationPreview on Registration {
            _id
            status
            event {
                _id
                slug
                name
                description
                startTime
                endTime
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
    console.log("useRegistrationsByUser", userId, data, loading, error)
    return [data?.registrationsByUser, loading, error]
}
