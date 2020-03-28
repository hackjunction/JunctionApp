import _axios from 'services/axios'

const ProjectsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}
ProjectsService.getProjectsByEvent = eventSlug => {
    return _axios.get(`/projects/${eventSlug}`)
}

ProjectsService.getPublicProjectById = projectId => {
    return _axios.get(`/projects/id/${projectId}`)
}

ProjectsService.getProjectsForEventAndTeam = (idToken, eventSlug) => {
    return _axios.get(`/projects/${eventSlug}/team`, config(idToken))
}

ProjectsService.createProjectForEventAndTeam = (idToken, eventSlug, data) => {
    return _axios.post(`/projects/${eventSlug}/team`, { data }, config(idToken))
}

ProjectsService.updateProjectForEventAndTeam = (idToken, eventSlug, data) => {
    return _axios.patch(
        `/projects/${eventSlug}/team`,
        { data },
        config(idToken)
    )
}

ProjectsService.getAllProjectsAsOrganiser = (idToken, eventSlug) => {
    return _axios.get(`/projects/${eventSlug}/admin`, config(idToken))
}

ProjectsService.generateChallengeLink = (idToken, eventSlug, challengeSlug) => {
    return _axios.get(
        `/projects/${eventSlug}/admin/${challengeSlug}/link`,
        config(idToken)
    )
}

ProjectsService.getProjectsWithToken = (eventSlug, token) => {
    return _axios.get(`/projects/${eventSlug}/token/${token}`)
}

export default ProjectsService
