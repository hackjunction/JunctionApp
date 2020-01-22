import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const GET_USER_AVATAR = gql`
    query UserProfile($userId: ID!) {
        userProfileById(userId: $userId) {
            avatar
        }
    }
`

export const useUserAvatar = userId => {
    const { data, loading, error } = useQuery(GET_USER_AVATAR, {
        variables: {
            userId,
        },
    })

    return [data?.userProfileById?.avatar, loading, error]
}
