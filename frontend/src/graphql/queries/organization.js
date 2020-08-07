import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const Fragments = {
    OrganizationListing: gql`
        fragment OrganizationListing on Organization {
            _id
            slug
            name
            about
            icon {
                url
                publicId
            }
            link
        }
    `,
}

export const GET_HACKERPACK_ITEM = gql`
    query Organization($_id: ID!) {
        organizationById(_id: $_id) {
            ...OrganizationListing
        }
    }
    ${Fragments.OrganizationListing}
`

export const useOrganization = _id => {
    const { data, loading, error } = useQuery(GET_HACKERPACK_ITEM, {
        variables: {
            _id,
        },
    })

    return [data?.organizationById, loading, error]
}

export const GET_FULL_HACKERPACK = gql`
    query Organization {
        OrganizationListing {
            ...OrganizationListing
        }
    }
    ${Fragments.OrganizationListing}
`

export const useOrganizationListing = () => {
    const { data, loading, error } = useQuery(GET_FULL_HACKERPACK)

    return [data?.OrganizationListing, loading, error]
}
