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

export default ProjectScoresService
