import _axios from 'services/axios';

const TeamsService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

TeamsService.getTeamsForEvent = (idToken, eventSlug) => {
    return _axios.get(`/teams/organiser/${eventSlug}`, config(idToken));
};

TeamsService.createTeamForEvent = (idToken, eventSlug) => {
    return _axios.post(`/teams/${eventSlug}`, {}, config(idToken));
};

TeamsService.deleteTeamForEvent = (idToken, eventSlug, teamCode) => {
    return _axios.delete(`/teams/${eventSlug}/${teamCode}`, config(idToken));
};

TeamsService.lockTeamForEvent = (idToken, eventSlug, teamCode) => {
    return _axios.patch(`/teams/${eventSlug}/${teamCode}`, {}, config(idToken));
};

TeamsService.joinTeamForEvent = (idToken, eventSlug, teamCode) => {
    return _axios.post(`/teams/${eventSlug}/${teamCode}/members`, {}, config(idToken));
};

TeamsService.leaveTeamForEvent = (idToken, eventSlug, teamCode) => {
    return _axios.delete(`/teams/${eventSlug}/${teamCode}/members`, config(idToken));
};

TeamsService.removeMemberFromTeam = (idToken, eventSlug, teamCode, userId) => {
    return _axios.delete(`/teams/${eventSlug}/${teamCode}/members/${userId}`, config(idToken));
};

TeamsService.getTeamForEvent = (idToken, eventSlug) => {
    return _axios.get(`/teams/${eventSlug}`, config(idToken));
};

export default TeamsService;
