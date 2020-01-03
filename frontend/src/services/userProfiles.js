import client from 'services/_client'

const UserProfilesService = {}

UserProfilesService.getUserProfile = idToken => {
    const url = `/api/user-profiles`
    return client.get(idToken)(url)
}

UserProfilesService.createUserProfile = (data, idToken) => {
    const url = `/api/user-profiles`
    return client.post(idToken)(url, data)
}

UserProfilesService.editUserProfile = (idToken, data) => {
    const url = `/api/user-profiles`
    return client.patch(idToken)(url, data)
}

UserProfilesService.getPublicUserProfiles = userIds => {
    const url = `/api/user-profiles/public`
    const searchParams = { userIds }
    return client.get()(url, { searchParams })
}

UserProfilesService.getPublicUserProfilesByTeam = teamId => {
    const url = `/api/user-profiles/public`
    const searchParams = { teamId }
    return client.get()(url, { searchParams })
}

UserProfilesService.queryUsers = (idToken, terms) => {
    const url = `/api/user-profiles/search`
    const searchParams = { terms }
    return client.get(idToken)(url, { searchParams })
}

UserProfilesService.getRecruiters = idToken => {
    const url = `/api/user-profiles/recruiters`
    return client.get(idToken)(url)
}

UserProfilesService.updateRecruiter = (
    idToken,
    recruiterId,
    events,
    organisation
) => {
    const url = `/api/user-profiles/recruiters`
    const data = { recruiterId, events, organisation }
    return client.patch(idToken)(url, data)
}

UserProfilesService.getUserProfileRecruitment = (userId, idToken) => {
    throw new Error('Not implemented!!')
    //return _axios.get(`/recruitment/profile/${userId}`, config(idToken))
}

export default UserProfilesService
