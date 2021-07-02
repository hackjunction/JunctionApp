import { gql, useQuery } from '@apollo/client'

export const GET_ORGANIZATION = gql`
    query Organization($userId: ID!) {
        organization(userId: $userId) {
            _id
            slug
            name
            about
            icon
            link
        }
    }
`

export const useOrganization = _id => {
    const { data, loading, error } = useQuery(GET_ORGANIZATION, {
        variables: {
            _id,
        },
    })

    return [data?.organizationById, loading, error]
}

export const GET_ORGANIZATIONS = gql`
    query Organizations {
        organizations {
            _id
            slug
            name
            about
            icon
            link
        }
    }
`

export const useAllOrganizations = () => {
    const { data, loading, error } = useQuery(GET_ORGANIZATIONS)
    return [data?.organizations, loading, error]
}
