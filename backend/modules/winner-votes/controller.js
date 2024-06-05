const _ = require('lodash')
const WinnerVote = require('./model')
const projectController = require('../project/controller')
const tokenVotingController = require('../voting-token/controller')
const { ValidationError, MongoError } = require('../../common/errors/errors')

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
    if (userVotes && userVotes.length > 0) {
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
    const tokenVotes = await tokenVotingController.getVotesByProject(event._id)
    if (tokenVotes && tokenVotes.length > 0) {
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

controller.submitVote = async (eventId, userId, projectId) => {
    if (!eventId || !projectId || !userId) {
        throw new ValidationError(
            'Some data is missing, try again. If the problem persists, contact support.',
        )
    }

    let vote = await WinnerVote.findOne({
        event: eventId,
        user: userId,
    })

    if (vote) {
        vote.project = projectId
    } else {
        vote = new WinnerVote({
            event: eventId,
            user: userId,
            project: projectId,
        })
    }

    if (!vote) {
        throw new Error(
            'Unknown error, please try again. If the problem persists, contact support.',
        )
    }

    try {
        const result = await vote.save()
        return result
    } catch (err) {
        throw new MongoError(
            'Vote could not be saved, reload the page and try again.',
            err,
        )
    }
}

module.exports = controller
