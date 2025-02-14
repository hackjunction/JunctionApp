const _ = require('lodash')
const Project = require('../project/model')
const { ProjectScore } = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

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
    return await ProjectScore.find(query)
}

controller.getScoreByEventSlugAndProjectIdAndPartnerAccount = async (
    projectId,
    userId,
    event,
) => {
    // Full project score object for a specific project

    const projectData = await Project.findById(projectId).orFail(
        new NotFoundError('The given project does not exist.'),
    )

    const projectScoreCriteria = getProjectScoreCriteria(
        event,
        projectData.challenges[0],
    )

    if (projectScoreCriteria.length < 1) {
        throw new NotFoundError('Scoring criteria not available')
    }

    const projectScoreData = await ProjectScore.findOne({
        project: projectId,
    })

    const projectScoreFound = {}

    if (projectScoreData) {
        // project score id passed to return object
        projectScoreFound.projectScoreId = projectScoreData._id

        //check for current reviewer
        const { reviewers } = projectScoreData

        if (reviewers.length > 0) {
            const partnerReviewFound = _.find(reviewers, { userId })

            if (partnerReviewFound) {
                //apply message to return object
                projectScoreFound.message = partnerReviewFound.message

                const updatedProjectScoreCriteria =
                    updateProjectScoreCriteriaForReviewer(
                        partnerReviewFound,
                        projectScoreCriteria,
                    )

                projectScoreFound.scoreCriteria =
                    updatedProjectScoreCriteria.projectScoreCriteria

                if (updatedProjectScoreCriteria.scoreCriteriaNotChanged) {
                    projectScoreFound.score = partnerReviewFound.score
                } else {
                    projectScoreFound.scoreCriteriaHasChanged = true
                }
                return projectScoreFound
            }
        }
    }

    projectScoreFound.scoreCriteria = projectScoreCriteria

    return projectScoreFound
}

controller.getPublicScores = async eventId => {
    return ProjectScore.find({ event: eventId })
        .populate({ path: 'event', select: 'name' })
        .populate({ path: 'project', select: 'name track challenges' })
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

//UTILS
const getProjectScoreCriteria = (event, projectChallenge) => {
    if (projectChallenge) {
        let challengeScoreCriteria = []
        const challengesCustomScoreCriteria = []

        if (event.challenges && event.challenges.length > 0) {
            event.challenges.map(challenge => {
                if (
                    challenge.scoreCriteriaChallengeSettings &&
                    challenge.scoreCriteriaChallengeSettings.length > 0
                ) {
                    return challengesCustomScoreCriteria.push({
                        challengeSlug: challenge.slug,
                        challengeScoreCriteria:
                            challenge.scoreCriteriaChallengeSettings,
                    })
                }
            })
        }

        const challengeScoreCriteriaSettings = _.find(
            challengesCustomScoreCriteria,
            { challengeSlug: projectChallenge },
        )

        if (challengeScoreCriteriaSettings) {
            challengeScoreCriteria =
                challengeScoreCriteriaSettings.challengeScoreCriteria
        }
        if (challengeScoreCriteria.length > 0) {
            return challengeScoreCriteria
        }
    }

    if (event.scoreCriteriaSettings.scoreCriteria.length > 0) {
        const scoreCriteriaBase = event.scoreCriteriaSettings.scoreCriteria
        return scoreCriteriaBase
    }

    return []
}

const updateProjectScoreCriteriaForReviewer = (
    partnerReview,
    projectScoreCriteria,
) => {
    const updatedProjectScoreCriteria = {
        scoreCriteriaNotChanged: true,
        projectScoreCriteria: [],
    }

    updatedProjectScoreCriteria.projectScoreCriteria = projectScoreCriteria.map(
        criterion => {
            //TODO optimize this as it is O(n * m)
            const match = _.find(
                partnerReview.scoreCriteria,
                reviewerCriteria => {
                    return reviewerCriteria.criteria === criterion.criteria
                },
            )
            if (!match) {
                updatedProjectScoreCriteria.scoreCriteriaNotChanged = false
                return criterion
            } else {
                return match
            }
        },
    )

    return updatedProjectScoreCriteria
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

module.exports = controller
