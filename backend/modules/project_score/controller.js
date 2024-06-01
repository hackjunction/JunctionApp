const _ = require('lodash')
const Event = require('../event/model')
const Project = require('../project/model')
const { ProjectScore } = require('./model')
const {
    NotFoundError,
    AlreadyExistsError,
} = require('../../common/errors/errors')

const controller = {}

controller.addProjectScore = async (projectId, projectScoreByReviewer) => {
    const projectScoreFound = await ProjectScore.findOne({ project: projectId })
    if (projectScoreFound) {
        return controller.updateProjectScoreWithReviewers(
            projectScoreFound._id,
            projectScoreByReviewer,
        )
    }
    const projectData = await Project.findById(projectId).orFail(
        new NotFoundError('The given project does not exist.'),
    )
    const projectScore = new ProjectScore({
        reviewers: [projectScoreByReviewer],
        project: projectId,
        event: projectData.event,
    })

    if (projectScore.reviewers && projectScore.reviewers.length > 0) {
        const averageScore = averageScoreCalculation(
            projectScore.reviewers,
            projectScore.score,
        )
        if (!averageScore) {
            throw new Error(
                'Score average calculation failed, make sure all criteria are filled in',
            )
        }
        projectScore.averageScore = averageScore
    }
    projectScore.save()
    return projectScore
}

controller.updateProjectScore = async (id, updatedProjectScore) => {
    const projectScore = await ProjectScore.findById(id).orFail(
        new NotFoundError('The given ProjectScore does not exist.'),
    )

    projectScore.score = updatedProjectScore.score
    projectScore.maxScore = updatedProjectScore.maxScore
    projectScore.message = updatedProjectScore.message
    projectScore.status = updatedProjectScore.status
    projectScore.track = updatedProjectScore.track
    projectScore.challenge = updatedProjectScore.challenge
    projectScore.scoreCriteria = updatedProjectScore.scoreCriteria

    projectScore.averageScore = projectScore.score

    if (projectScore.reviewers && projectScore.reviewers.length > 0) {
        const averageScore = averageScoreCalculation(
            projectScore.reviewers,
            projectScore.score,
        )
        if (!averageScore) {
            throw new Error('Score average calculation failed')
        }
        projectScore.averageScore = averageScore
    }
    await projectScore.save()
    return projectScore
}

controller.getScoresByEventAndTeamId = (eventId, teamId) => {
    return ProjectScore.find({ event: eventId })
        .populate({
            path: 'project',
            match: { team: teamId },
            select: '_id',
        })
        .populate({
            path: 'event',
        })
}

controller.getScoreByProjectId = async (
    projectId,
    challenge = null,
    track = null,
) => {
    const query = {
        project: projectId,
    }
    if (challenge) {
        query.challenge = challenge
    }
    if (track) {
        query.track = track
    }
    return ProjectScore.find(query)
}

controller.getScoreForProjectByReviewerId = async (projectId, reviewerId) => {
    const testProjectScore = await controller.getScoreByProjectId(projectId)
    if (testProjectScore && testProjectScore.length > 0) {
        testProjectScore[0].reviewers.forEach(reviewer => {})
        const scoreFromReviewer = _.find(
            testProjectScore[0].reviewers,
            reviewerScore => reviewerScore.userId === reviewerId,
        )
        return scoreFromReviewer
    }
}

controller.getPublicScores = async eventId => {
    return ProjectScore.find({ event: eventId })
        .populate({ path: 'event', select: 'name' })
        .populate({ path: 'project', select: 'name track challenges' })
}

const limitDecimals = (number, decimalPlaces) => {
    const multiplier = Math.pow(10, decimalPlaces)
    return Math.floor(number * multiplier) / multiplier
}

const averageScoreCalculation = (reviewers, globalScore) => {
    const allScores = reviewers.map(review => review.score)
    if (globalScore) {
        allScores.push(globalScore)
    }
    let scoreCount = allScores.length

    const scoreSum = allScores.reduce((acc, current) => {
        if (current && current > 0) {
            return acc + current
        } else {
            scoreCount = scoreCount - 1
            return acc
        }
    }, 0)

    let finalScore = scoreSum / scoreCount
    if (!Number.isInteger(finalScore)) {
        finalScore = limitDecimals(finalScore, 2)
    }
    return finalScore
}

controller.updateProjectScoreWithReviewers = async (
    projectScoreId,
    updatedProjectScore,
) => {
    const projectScore = await ProjectScore.findById(projectScoreId).orFail(
        new NotFoundError(
            'The given ProjectScore does not exist, refresh and try again.',
        ),
    )
    const reviewerFoundIndex = _.findIndex(projectScore.reviewers, {
        userId: updatedProjectScore.userId,
    })
    if (reviewerFoundIndex !== -1) {
        projectScore.reviewers[reviewerFoundIndex].score =
            updatedProjectScore.score
        projectScore.reviewers[reviewerFoundIndex].scoreCriteria =
            updatedProjectScore.scoreCriteria
        projectScore.reviewers[reviewerFoundIndex].message =
            updatedProjectScore.message
    } else {
        projectScore.reviewers.push(updatedProjectScore)
    }
    projectScore.averageScore = projectScore.score

    if (projectScore.reviewers && projectScore.reviewers.length > 0) {
        const averageScore = averageScoreCalculation(
            projectScore.reviewers,
            projectScore.score,
        )
        if (!averageScore) {
            throw new Error(
                'Score average calculation failed, make sure all criteria are filled in',
            )
        }
        projectScore.averageScore = averageScore
    }
    await projectScore.save()
    return projectScore
}

module.exports = controller
