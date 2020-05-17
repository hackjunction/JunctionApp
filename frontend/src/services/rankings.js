import _axios from 'services/axios'

const RankingsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

RankingsService.getPublicResults = eventSlug => {
    return _axios.get(`/rankings/${eventSlug}`)
}

RankingsService.getFullResults = (idToken, eventSlug) => {
    return _axios.get(`/rankings/${eventSlug}/admin`, config(idToken))
}

RankingsService.getOverallResultsForEvent = (idToken, eventSlug) => {
    return _axios.get(`/rankings/${eventSlug}/admin/overall`, config(idToken))
}

RankingsService.getTrackResultsForEvent = (idToken, eventSlug, trackSlug) => {
    return _axios.get(
        `/rankings/${eventSlug}/admin/track/${trackSlug}`,
        config(idToken)
    )
}

RankingsService.getChallengeResultsForEvent = (
    idToken,
    eventSlug,
    challengeSlug
) => {
    return _axios.get(
        `/rankings/${eventSlug}/admin/challenge/${challengeSlug}`,
        config(idToken)
    )
}

RankingsService.updateOverallResultsForEvent = (
    idToken,
    eventSlug,
    rankings
) => {
    return _axios.patch(
        `/rankings/${eventSlug}/admin/overall`,
        { rankings },
        config(idToken)
    )
}

RankingsService.updateTrackResultsForEvent = (
    idToken,
    eventSlug,
    trackSlug,
    rankings
) => {
    return _axios.patch(
        `/rankings/${eventSlug}/admin/track/${trackSlug}`,
        { rankings },
        config(idToken)
    )
}

RankingsService.generateResults = (idToken, eventSlug) => {
    return _axios.patch(
        `/rankings/${eventSlug}/admin/generate-results`,
        config(idToken)
    )
}

RankingsService.getVotes = (idToken, eventSlug) => {
    return _axios.get(
        `/rankings/${eventSlug}/admin/get-gavel-votes`,
        config(idToken)
    )
}

RankingsService.updateChallengeResultsForEvent = (
    idToken,
    eventSlug,
    challengeSlug,
    rankings
) => {
    return _axios.patch(
        `/rankings/${eventSlug}/admin/challenge/${challengeSlug}`,
        { rankings },
        config(idToken)
    )
}

export default RankingsService
