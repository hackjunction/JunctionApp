import _axios from 'services/axios'

const TeamsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

TeamsService.getTeamsForEvent = (idToken, eventSlug) => {
    return _axios.get(`/teams/organiser/${eventSlug}`, config(idToken))
}

TeamsService.exportTeams = (idToken, eventSlug, teamIds) => {
    return _axios.post(
        `/teams/organiser/${eventSlug}/export`,
        { teamIds },
        config(idToken),
    )
}

TeamsService.createTeamForEvent = (idToken, eventSlug, populate) => {
    return _axios.post(
        `/teams/${eventSlug}?populate=${populate}`,
        {},
        config(idToken),
    )
}

TeamsService.deleteTeamForEvent = (idToken, eventSlug) => {
    return _axios.delete(`/teams/${eventSlug}`, config(idToken))
}

TeamsService.editTeamForEvent = (idToken, eventSlug, edits) => {
    return _axios.patch(`/teams/${eventSlug}`, edits, config(idToken))
}

TeamsService.joinTeamForEvent = (idToken, eventSlug, teamCode, populate) => {
    return _axios.post(
        `/teams/${eventSlug}/${teamCode}/members?populate=${populate}`,
        {},
        config(idToken),
    )
}

TeamsService.leaveTeamForEvent = (idToken, eventSlug, teamCode) => {
    return _axios.delete(
        `/teams/${eventSlug}/${teamCode}/members`,
        config(idToken),
    )
}

TeamsService.removeMemberFromTeam = (idToken, eventSlug, teamCode, userId) => {
    return _axios.delete(
        `/teams/${eventSlug}/${teamCode}/members/${userId}`,
        config(idToken),
    )
}

TeamsService.getTeamForEvent = (idToken, eventSlug, populate = false) => {
    return _axios.get(
        `/teams/${eventSlug}?populate=${populate}`,
        config(idToken),
    )
}

TeamsService.getAllTeamsForEventParticipant = (idToken, eventSlug) => {
    return _axios.get(`/teams/${eventSlug}/teams`, config(idToken))
}

export default TeamsService
