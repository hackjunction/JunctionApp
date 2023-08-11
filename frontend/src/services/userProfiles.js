import _axios from 'services/axios'

const UserProfilesService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

UserProfilesService.getPublicUserProfiles = userIds => {
    return _axios.get('/user-profiles/public/', {
        params: {
            userIds,
        },
    })
}

UserProfilesService.getPublicUserProfilesByTeam = teamId => {
    return _axios.get('/user-profiles/public/team/' + teamId)
}

UserProfilesService.getUserProfile = idToken => {
    return _axios.get('/user-profiles/', config(idToken))
}

UserProfilesService.createUserProfile = (data, idToken) => {
    return _axios.post('/user-profiles/', data, config(idToken))
}

UserProfilesService.editUserProfile = (idToken, data) => {
    return _axios.patch('/user-profiles/', data, config(idToken))
}

UserProfilesService.getUserPublicProfileById = (idToken, userId) => {
    return _axios.get('/user-profiles/' + userId, config(idToken))
}

// UserProfilesService.getUsersByEmail = (email, idToken) => {
//     return _axios.get('/user-profiles/search', {
//         params: { email },
//         ...config(idToken)
//     });
// };

UserProfilesService.queryUsers = (idToken, terms) => {
    return _axios.get(`/user-profiles/search/${terms}`, config(idToken))
}

UserProfilesService.getUserProfileRecruitment = (userId, idToken) => {
    return _axios.get(`/recruitment/profile/${userId}`, config(idToken))
}

UserProfilesService.getRecruiters = idToken => {
    return _axios.get('/user-profiles/recruiters', config(idToken))
}

UserProfilesService.getUserProfilesByTeamId = (teamId, idToken) => {
    return _axios.get(`/user-profiles/team/${teamId}`, config(idToken))
}

UserProfilesService.updateRecruiter = (
    idToken,
    recruiterId,
    events,
    organisation,
) => {
    const data = { recruiterId, events, organisation }
    return _axios.patch('/user-profiles/recruiters', data, config(idToken))
}

export default UserProfilesService
