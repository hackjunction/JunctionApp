const Event = require('../event/model')
const Project = require('../project/model')
const { ProjectScore } = require('./model')
const { NotFoundError } = require('../../common/errors/errors')

const controller = {}

controller.addProjectScore = async score => {
    await Project.findById(score.project).orFail(
        new NotFoundError('The given project does not exist.'),
    )
    await Event.findById(score.event).orFail(
        new NotFoundError('The given event does not exist.'),
    )
    console.log('Adding', score)

    const projectScore = new ProjectScore({ ...score })
    return projectScore.save()
    // return null
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

controller.getScoreByProjectId = (
    projectId,
    challenge = null,
    track = null,
) => {
    console.log('projecting', projectId, challenge, track)
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

controller.getPublicScores = async eventId => {
    return ProjectScore.find({ event: eventId })
        .populate({ path: 'event', select: 'name' })
        .populate({ path: 'project', select: 'name track challenges' })
}

module.exports = controller
