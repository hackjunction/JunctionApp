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

// Alternative endpoints for partner reviewing

ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken = (
    token,
    eventSlug,
    projectId,
) => {
    return _axios.get(
        `/project-scores/event/${eventSlug}/project/${projectId}/${token}`,
    )
}

ProjectScoresService.addScoreByEventSlugAndPartnerToken = (
    token,
    eventSlug,
    projectScore,
) => {
    return _axios.post(
        `/project-scores/event/${eventSlug}/${projectScore._id}/${token}`,
        projectScore,
    )
}

ProjectScoresService.updateScoreByEventSlugAndPartnerToken = (
    token,
    eventSlug,
    projectScore,
) => {
    return _axios.put(
        `/project-scores/event/${eventSlug}/${projectScore._id}/${token}`,
        projectScore,
    )
}

// Alternative endpoints for partner reviewing with personal accounts

ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerAccount = (
    idToken,
    eventSlug,
    projectId,
) => {
    return _axios.get(
        `/project-scores/review/event/${eventSlug}/${projectId}`,
        config(idToken),
    )
}

ProjectScoresService.addScoreByEventSlugAndProjectIdAndPartnerAccount = (
    idToken,
    eventSlug,
    projectScore,
) => {
    console.log('Adding new score from partner account',projectScore._id)
    return _axios.post(
        `/project-scores/review/event/${eventSlug}/${projectScore._id}`,
        projectScore,
        config(idToken),
    )
}

ProjectScoresService.updateScoreByEventSlugAndProjectIdAndPartnerAccount = (
    idToken,
    eventSlug,
    // projectId,
    projectScore,
) => {
    console.log('Updating working', {
        idToken,
        eventSlug,
        projectScore,
    })
    return _axios.put(
        `/project-scores/review/event/${eventSlug}/${projectScore._id}`,
        projectScore,
        config(idToken),
    )
}

export default ProjectScoresService
