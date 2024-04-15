const _ = require('lodash')
const WinnerVote = require('./model')
const projectController = require('../project/controller')
const tokenVotingController = require('../voting-token/controller')

const controller = {}

controller.getFinalistProjectsWithAllVotes = async event => {
    const finalistProjects = await projectController.getFinalists(event)
    const finalistProjectsWithVotes = finalistProjects.map(project => {
        const projectObject = project.toObject()
        projectObject.votingData = {
            totalVotes: 0,
            userVotes: 0,
            tokenVotes: 0,
        }
        return projectObject
    })
    const userVotes = await controller.getVotesForEvent(event)
    const tokenVotes = await tokenVotingController.getVotesByProject(event._id)
    if (userVotes) {
        userVotes.map(v => {
            const projectWithVotes = _.find(
                finalistProjectsWithVotes,
                project => project._id.toString() === v.project,
            )
            if (projectWithVotes) {
                projectWithVotes.votingData.userVotes = v.votes
            }
        })
    }
    if (tokenVotes) {
        tokenVotes.map(v => {
            const projectWithVotes = _.find(
                finalistProjectsWithVotes,
                project => project._id.toString() === v.project,
            )
            if (projectWithVotes) {
                projectWithVotes.votingData.tokenVotes = v.votes
            }
        })
    }
    finalistProjectsWithVotes.forEach(project => {
        project.votingData.totalVotes =
            project.votingData.userVotes + project.votingData.tokenVotes
    })
    const sortedProjects = _.sortBy(
        finalistProjectsWithVotes,
        n => -1 * n.votingData.totalVotes,
    )
    return sortedProjects
}

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
    return results
}

module.exports = controller
