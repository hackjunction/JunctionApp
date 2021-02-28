import { gql, useQuery } from '@apollo/client'

const Fragments = {
    ProfilePreview: gql`
        fragment ProfilePreview on UserProfile {
            avatar
            firstName
            lastName
            email
        }
    `,
}

export const GET_PROFILE_PREVIEW = gql`
    query UserProfile($userId: ID!) {
        userProfileById(userId: $userId) {
            ...ProfilePreview
        }
    }
    ${Fragments.ProfilePreview}
`

export const useUserAvatar = userId => {
    const { data, loading, error } = useQuery(GET_PROFILE_PREVIEW, {
        variables: {
            userId,
        },
    })

    return [data?.userProfileById?.avatar, loading, error]
}

export const GET_MY_PROFILE_PREVIEW = gql`
    query UserProfile {
        myProfile {
            ...ProfilePreview
        }
    }
    ${Fragments.ProfilePreview}
`

export const useMyProfilePreview = () => {
    const { data, loading, error } = useQuery(GET_MY_PROFILE_PREVIEW)

    return [data?.myProfile, loading, error]
}
