import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const Fragments = {
    HackerpackListing: gql`
        fragment HackerpackListing on Hackerpack {
            _id
            slug
            name
            description
            icon {
                url
                publicId
            }
            link
        }
    `,
}

export const GET_HACKERPACK_ITEM = gql`
    query Hackerpack($_id: ID!) {
        hackerpackById(_id: $_id) {
            ...HackerpackListing
        }
    }
    ${Fragments.HackerpackListing}
`

export const useHackerpack = _id => {
    const { data, loading, error } = useQuery(GET_HACKERPACK_ITEM, {
        variables: {
            _id,
        },
    })

    return [data?.hackerpackById, loading, error]
}

export const GET_FULL_HACKERPACK = gql`
    query Hackerpack {
        HackerpackListing {
            ...HackerpackListing
        }
    }
    ${Fragments.HackerpackListing}
`

export const useHackerpackListing = () => {
    const { data, loading, error } = useQuery(GET_FULL_HACKERPACK)

    return [data?.HackerpackListing, loading, error]
}
