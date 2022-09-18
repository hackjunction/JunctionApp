import _axios from 'services/axios'

const VotingTokenService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

VotingTokenService.getVotingTokens = (idToken, slug) => {
    return _axios.get(`/voting-token/event/${slug}`, config(idToken))
}

VotingTokenService.getVotingTokenResults = (idToken, slug) => {
    return _axios.get(`/voting-token/event/${slug}/results`, config(idToken))
}

VotingTokenService.createVotingToken = (idToken, slug, tokenName) => {
    return _axios.post(
        `/voting-token/event/${slug}`,
        { name: tokenName },
        config(idToken),
    )
}

VotingTokenService.updateVotingToken = (idToken, slug, tokenId, tokenName) => {
    return _axios.put(
        `/voting-token/event/${slug}/${tokenId}`,
        { name: tokenName },
        config(idToken),
    )
}

VotingTokenService.revokeVotingToken = (idToken, slug, tokenId) => {
    return _axios.delete(
        `/voting-token/event/${slug}/${tokenId}`,
        config(idToken),
    )
}

VotingTokenService.voteWithToken = (idToken, tokenId, projectId) => {
    return _axios.post(
        `/voting-token/vote?votingToken=${tokenId}`,
        { projectId },
        config(idToken),
    )
}

export default VotingTokenService
