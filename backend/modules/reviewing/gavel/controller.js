const _ = require('lodash')
const mongoose = require('mongoose')
const GavelAnnotator = require('./Annotator')
const GavelDecision = require('./Decision')
const GavelProject = require('./Project')

const TeamController = require('../../team/controller')
const {
    ForbiddenError,
    NotFoundError,
} = require('../../../common/errors/errors')
const Maths = require('./maths')

const controller = {}

controller.ensureGavelProject = async project => {
    const existing = await GavelProject.findOne({
        project: project._id,
        event: project.event,
    })

    if (existing) {
        /** Make sure the track is updated, should it change */
        existing.track = project.track
        return existing.save()
    } else {
        const gavelproject = new GavelProject({
            project: project._id,
            event: project.event,
            track: project.track,
        })
        return gavelproject.save()
    }
}

controller.getProject = async projectId => {
    return GavelProject.findById(projectId).populate('project')
}

controller.editProject = async (projectId, data) => {
    return GavelProject.findById(projectId).then(project => {
        if (!project) {
            throw new NotFoundError('No project found with id ' + projectId)
        }
        if (data.hasOwnProperty('active')) {
            project.active = data.active
        }
        return project.save()
    })
}

controller.getProjectsForEvent = async eventId => {
    return GavelProject.find({ event: eventId })
}

controller.getAnnotatorsForEvent = async eventId => {
    return GavelAnnotator.find({ event: eventId })
}

controller.getAnnotator = async (event, userId) => {
    return GavelAnnotator.findOne({ event: event._id, user: userId })
}

controller.editAnnotator = async (annotatorId, data) => {
    return GavelAnnotator.findById(annotatorId).then(annotator => {
        if (!annotator) {
            throw new NotFoundError('No annotator found with id ' + annotatorId)
        }

        if (data.hasOwnProperty('active')) {
            annotator.active = data.active
        }
        if (data.hasOwnProperty('track')) {
            annotator.track = data.track
        }
        return annotator.save()
    })
}

controller.initAnnotator = async (event, userId) => {
    const team = await TeamController.getTeam(event._id, userId).catch(
        () => null
    )
    const [projects, annotators] = await Promise.all([
        mongoose.model('Project').find({ event: event._id }),
        GavelAnnotator.find({ event: event._id }),
    ])
    const ownProject = team
        ? _.find(projects, project => project.team === team._id)
        : null

    /** If the event is using tracks, figure out the track that needs reviewers the most */
    let assignedTrack
    if (event.tracksEnabled && event.tracks && event.tracks.length > 0) {
        const projectsPerTrack = _.countBy(projects, 'track')
        const annotatorsPerTrack = _.countBy(annotators, 'track')
        const tracksSorted = _.sortBy(event.tracks, track => {
            const projectCount = projectsPerTrack[track.slug] || 1
            const annotatorCount = annotatorsPerTrack[track.slug] || 0

            return (annotatorCount * 1.0) / projectCount
        })

        if (tracksSorted.length === 1) {
            assignedTrack = tracksSorted[0].slug
        } else {
            if (ownProject && ownProject.track) {
                for (let track of tracksSorted) {
                    if (track.slug !== ownProject.track) {
                        assignedTrack = track.slug
                        break
                    }
                }
            } else {
                assignedTrack = tracksSorted[0].slug
            }
        }
    }

    const annotator = new GavelAnnotator({
        user: userId,
        event: event._id,
        team: team ? team._id : null,
        track: assignedTrack,
    })

    const savedAnnotator = await annotator.save()
    return savedAnnotator.assignNextProject()
}

controller.submitVote = async (event, userId, winningProjectId) => {
    // Get the annotator profile for a user
    const annotator = await GavelAnnotator.findOne({
        event: event._id,
        user: userId,
    })

    if (
        winningProjectId !== annotator.next.toString() &&
        winningProjectId !== annotator.prev.toString()
    ) {
        throw new ForbiddenError(
            `Invalid choice for winning project, must be one of: ${annotator.prev}, ${annotator.next}`
        )
    }

    // Throws error if annotator can't vote, handled globally
    await annotator.canVote()

    const losingProjectId =
        winningProjectId === annotator.next.toString()
            ? annotator.prev
            : annotator.next

    const [loser, winner] = await Promise.all([
        GavelProject.findById(losingProjectId),
        GavelProject.findById(winningProjectId),
    ])

    const {
        updated_alpha,
        updated_beta,
        updated_mu_winner,
        updated_mu_loser,
        updated_sigma_sq_winner,
        updated_sigma_sq_loser,
    } = Maths.update(
        annotator.alpha,
        annotator.beta,
        winner.mu,
        winner.sigma_sq,
        loser.mu,
        loser.sigma_sq
    )

    annotator.alpha = updated_alpha
    annotator.beta = updated_beta

    loser.mu = updated_mu_loser
    loser.sigma_sq = updated_sigma_sq_loser
    if (loser._id.toString() === annotator.next.toString()) {
        loser.viewedBy.push(annotator._id.toString())
    }
    winner.mu = updated_mu_winner
    winner.sigma_sq = updated_sigma_sq_winner
    if (winner._id.toString() === annotator.next.toString()) {
        winner.viewedBy.push(annotator._id.toString())
    }

    const decision = new GavelDecision({
        annotator: annotator._id,
        event: event._id,
        winner: winner._id,
        loser: loser._id,
    })

    await Promise.all([loser.save(), winner.save(), decision.save()])
    const updatedAnnotator = await annotator.assignNextProject()

    return updatedAnnotator
}

controller.getResults = async (eventId, track = null) => {
    const projects = await GavelProject.find({
        event: eventId,
        track: track,
    }).lean()
    const sorted = _.sortBy(projects, p => -1 * p.mu)
    const results = sorted.map(gavelProject => {
        return {
            project: gavelProject.project,
            score: gavelProject.mu,
        }
    })
    return results
}

module.exports = controller
