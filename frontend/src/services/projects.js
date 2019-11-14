import _axios from 'services/axios';

const ProjectsService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

ProjectsService.getProjectForEventAndTeam = (idToken, eventSlug) => {
    return _axios.get(`/projects/${eventSlug}/team`, config(idToken));
};

ProjectsService.createProjectForEventAndTeam = (idToken, eventSlug, data) => {
    return _axios.post(`/projects/${eventSlug}/team`, { data }, config(idToken));
};

ProjectsService.updateProjectForEventAndTeam = (idToken, eventSlug, data) => {
    return _axios.patch(`/projects/${eventSlug}/team`, { data }, config(idToken));
};

export default ProjectsService;
