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

//TODO createTeamForEvent is deprecated and to be removed in the future
TeamsService.createTeamForEvent = (idToken, eventSlug, populate) => {
    return _axios.post(
        `/teams/${eventSlug}?populate=${populate}`,
        {},
        config(idToken),
    )
}

// TODO: When createTeamForEvent is removed, rename this to createTeamForEvent
TeamsService.createNewTeamForEvent = (idToken, eventSlug, data, populate) => {
    return _axios.post(
        `/teams/${eventSlug}/teams?populate=${populate}`,
        data,
        config(idToken),
    )
}

TeamsService.deleteTeamForEvent = (idToken, eventSlug) => {
    return _axios.delete(`/teams/${eventSlug}`, config(idToken))
}

TeamsService.editTeamForEvent = (idToken, eventSlug, edits, populate) => {
    return _axios.patch(
        `/teams/${eventSlug}?populate=${populate}`,
        edits,
        config(idToken),
    )
}

TeamsService.candidateApplyToTeam = (
    idToken,
    eventSlug,
    teamCode,
    applicationData,
) => {
    return _axios.patch(
        `/teams/${eventSlug}/teams/${teamCode}`,
        applicationData,
        config(idToken),
    )
}

TeamsService.acceptCandidateToTeam = (
    idToken,
    eventSlug,
    teamCode,
    candidateId,
) => {
    return _axios.patch(
        `/teams/${eventSlug}/teams/${teamCode}/accept/${candidateId}`,
        {},
        config(idToken),
    )
}

TeamsService.declineCandidateToTeam = (
    idToken,
    eventSlug,
    teamCode,
    candidateId,
) => {
    console.log('Sending')
    return _axios.patch(
        `/teams/${eventSlug}/teams/${teamCode}/decline/${candidateId}`,
        {},
        config(idToken),
    )
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

TeamsService.getTeamWithMetaForEventParticipant = (
    idToken,
    eventSlug,
    teamCode,
    populate = true,
) => {
    return _axios.get(
        `/teams/${eventSlug}/teams/${teamCode}?populate=${populate}`,
        config(idToken),
    )
}

export default TeamsService
