import _axios from 'services/axios'

const GavelService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/reviewing/gavel'

GavelService.getAllProjects = (idToken, eventSlug) => {
    return _axios.get(`${BASE_ROUTE}/${eventSlug}/projects`, config(idToken))
}

GavelService.getAllAnnotators = (idToken, eventSlug) => {
    return _axios.get(`${BASE_ROUTE}/${eventSlug}/annotators`, config(idToken))
}

GavelService.getProjectDetails = (idToken, projectId) => {
    return _axios.get(`${BASE_ROUTE}/projects/${projectId}`, config(idToken))
}

GavelService.editProject = (idToken, eventSlug, projectId, edits) => {
    return _axios.patch(
        `${BASE_ROUTE}/${eventSlug}/projects/${projectId}`,
        { edits },
        config(idToken)
    )
}

GavelService.editAnnotator = (idToken, eventSlug, annotatorId, edits) => {
    return _axios.patch(
        `${BASE_ROUTE}/${eventSlug}/annotators/${annotatorId}`,
        { edits },
        config(idToken)
    )
}

GavelService.getAnnotator = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/annotator`, config(idToken))
}

GavelService.beginVoting = (idToken, slug) => {
    return _axios.post(`${BASE_ROUTE}/${slug}/annotator`, {}, config(idToken))
}

GavelService.skipProject = (idToken, slug) => {
    return _axios.post(`${BASE_ROUTE}/${slug}/skip`, {}, config(idToken))
}

GavelService.setFirstProjectSeen = (idToken, slug) => {
    return _axios.post(`${BASE_ROUTE}/${slug}/done`, {}, config(idToken))
}

GavelService.submitVote = (idToken, slug, winnerId) => {
    return _axios.post(
        `${BASE_ROUTE}/${slug}/vote/${winnerId}`,
        {},
        config(idToken)
    )
}

export default GavelService
