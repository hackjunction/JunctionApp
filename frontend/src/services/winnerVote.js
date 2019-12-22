import _axios from 'services/axios'

const WinnerVoteService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

WinnerVoteService.submitVote = (idToken, slug, projectId) => {
    return _axios.post(`/winner-votes/${slug}`, { projectId }, config(idToken))
}

WinnerVoteService.getVote = (idToken, slug) => {
    return _axios.get(`/winner-votes/${slug}`, config(idToken))
}

WinnerVoteService.getResults = (idToken, slug) => {
    return _axios.get(`/winner-votes/${slug}/results`, config(idToken))
}

export default WinnerVoteService
