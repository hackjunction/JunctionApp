const _ = require('lodash')
const WinnerVote = require('./model')

const controller = {}

controller.getVotesForEvent = async event => {
    const votes = await WinnerVote.find({ event: event._id }).lean()
    const grouped = _.groupBy(votes, 'project')
    const results = Object.keys(grouped).reduce((result, projectId) => {
        const projectVotes = grouped[projectId]
        result.push({
            project: projectId,
            votes: projectVotes.length,
        })
        return result
    }, [])
    const sorted = _.sortBy(results, n => -1 * n.votes)
    return sorted
}

module.exports = controller
