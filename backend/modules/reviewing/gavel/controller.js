const _ = require('lodash')
const mongoose = require('mongoose')
const moment = require('moment-timezone')
const { EventHelpers } = require('@hackjunction/shared')
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
    }
    const gavelproject = new GavelProject({
        project: project._id,
        event: project.event,
        track: project.track,
    })
    return gavelproject.save()
}

controller.getProject = async projectId => {
    return GavelProject.findById(projectId).populate('project')
}

controller.editProject = async (projectId, data) => {
    return GavelProject.findById(projectId).then(project => {
        if (!project) {
            throw new NotFoundError(`No project found with id ${projectId}`)
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
            throw new NotFoundError(`No annotator found with id ${annotatorId}`)
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
    console.log('voting open?', EventHelpers.isVotingOpen(event, moment))
    if (!EventHelpers.isVotingOpen(event, moment)) {
        return Promise.reject(
            new ForbiddenError('Cannot start voting while voting is not open')
        )
    }
    console.log('tem')
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
        /*
        if (tracksSorted.length === 1) {
            assignedTrack = tracksSorted[0].slug
        } else if (ownProject && ownProject.track) {
            for (const track of tracksSorted) {
                if (track.slug !== ownProject.track) {
                    assignedTrack = track.slug
                    break
                }
            }
        } else {
            assignedTrack = tracksSorted[0].slug
        } */

        if (tracksSorted.length === 1) {
            // TODO the multiple track event gavel should be tested
            assignedTrack = tracksSorted[0].slug
            tracksSorted.forEach(track => {
                if (assignedTrack.slug === ownProject.track) {
                    assignedTrack = track.slug
                }
            })
        } else {
            assignedTrack = tracksSorted[0].slug
        }
        console.log('assigned track is', assignedTrack)
    }

    const annotator = new GavelAnnotator({
        user: userId,
        event: event._id,
        team: team ? team._id : null,
        track: assignedTrack,
    })
    const savedAnnotator = await annotator.save()
    console.log(
        'savedAnnotator',
        savedAnnotator,
        savedAnnotator.methods,
        annotator,
        annotator.methods
    )
    return annotator.assignNextProject()
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
        updatedAlpha,
        updatedBeta,
        updatedMuWinner,
        updatedMuLoser,
        updatedSigmaSqWinner,
        updatedSigmaSqLoser,
    } = Maths.update(
        annotator.alpha,
        annotator.beta,
        winner.mu,
        winner.sigmaSq,
        loser.mu,
        loser.sigmaSq
    )

    annotator.alpha = updatedAlpha
    annotator.beta = updatedBeta

    loser.mu = updatedMuLoser
    loser.sigmaSq = updatedSigmaSqLoser
    if (loser._id.toString() === annotator.next.toString()) {
        loser.viewedBy.push(annotator._id.toString())
    }
    winner.mu = updatedMuWinner
    winner.sigmaSq = updatedSigmaSqWinner
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
        track,
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

controller.getVotes = async eventId => {
    // TODO this is spagetth  fix
    const votes = await GavelDecision.find({
        event: eventId,
    }).lean()
    const newVotes = votes.map(async v => {
        v.loser = await GavelProject.findById(v.loser).exec()
        v.winner = await GavelProject.findById(v.winner).exec()
        return v
    })
    return Promise.all(newVotes).then(values => {
        return values
    })
}

module.exports = controller
