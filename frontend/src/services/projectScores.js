import _axios from 'services/axios'

const ProjectScoresService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

ProjectScoresService.getScoresByEventAndTeam = (idToken, eventSlug) => {
    return _axios.get(`/project-scores/personal/${eventSlug}`, config(idToken))
}

ProjectScoresService.getScoreByEventSlugAndProjectId = (
    idToken,
    eventSlug,
    projectId,
) => {
    return _axios.get(
        `/project-scores/event/${eventSlug}/project/${projectId}`,
        config(idToken),
    )
}

ProjectScoresService.addScoreByEventSlug = (
    idToken,
    eventSlug,
    projectScore,
) => {
    return _axios.post(
        `/project-scores/event/${eventSlug}`,
        projectScore,
        config(idToken),
    )
}

ProjectScoresService.updateScoreByEventSlug = (
    idToken,
    eventSlug,
    projectScore,
) => {
    return _axios.put(
        `/project-scores/event/${eventSlug}/${projectScore._id}`,
        projectScore,
        config(idToken),
    )
}

export default ProjectScoresService
