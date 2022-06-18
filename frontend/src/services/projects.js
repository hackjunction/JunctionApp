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
        config(idToken),
    )
}

ProjectsService.getAllProjectsAsOrganiser = (idToken, eventSlug) => {
    return _axios.get(`/projects/${eventSlug}/admin`, config(idToken))
}

ProjectsService.generateChallengeLink = (idToken, eventSlug, challengeSlug) => {
    return _axios.get(
        `/projects/${eventSlug}/admin/challenge/${challengeSlug}/link`,
        config(idToken),
    )
}

ProjectsService.generateTrackLink = (idToken, eventSlug, trackSlug) => {
    console.log('trackSlug :>> ', trackSlug)
    return _axios.get(
        `/projects/${eventSlug}/admin/track/${trackSlug}/link`,
        config(idToken),
    )
}

ProjectsService.getChallengeProjectsWithToken = (eventSlug, token) => {
    return _axios.get(`/projects/${eventSlug}/challenge/${token}`)
}

ProjectsService.getTrackProjectsWithToken = (eventSlug, token) => {
    const projects = _axios.get(`/projects/${eventSlug}/tracks/${token}`)
    console.log('projects :>> ', projects)
    return _axios.get(`/projects/${eventSlug}/tracks/${token}`)
}

ProjectsService.validateToken = (eventSlug, token) => {
    return _axios.get(`/projects/${eventSlug}/token/${token}/validate`)
}

ProjectsService.getCommits = projectId => {
    const project = _axios.get(`/projects/id/${projectId}`)
    return project
}

ProjectsService.exportProjects = (idToken, eventSlug, projectIds) => {
    const projects = _axios.post(
        `/projects/${eventSlug}/admin/export`,
        { projectIds },
        config(idToken),
    )
    return projects
}

export default ProjectsService
