const Promise = require('bluebird')
const _ = require('lodash')

const {
    ReviewingMethods,
    OverallReviewingMethods,
} = require('@hackjunction/shared')
const Rankings = require('./model')

const WinnerVoteController = require('../winner-votes/controller')
const GavelController = require('../reviewing/gavel/controller')
const EventController = require('../event/controller')

const { ForbiddenError } = require('../../common/errors/errors')

const controller = {}

controller.getTrackResults = (event, track) => {
    return Rankings.findOne({
        event: event._id,
        track,
    })
}

controller.updateTrackResults = (event, track, rankings) => {
    if (!event.tracksEnabled) {
        throw new ForbiddenError(
            `Can't update track results for event with tracks disabled`,
        )
    }
    if (!event.tracks.indexOf(track) === -1) {
        throw new ForbiddenError(
            `${track} is not a valid track for event ${event.name}`,
        )
    }
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            track,
        },
        {
            rankings,
        },
        {
            upsert: true,
        },
    )
}

controller.getChallengeResults = (event, challenge) => {
    return Rankings.findOne({
        event: event._id,
        challenge,
    })
}

controller.updateChallengeResults = (event, challenge, rankings) => {
    if (!event.challengesEnabled) {
        throw new ForbiddenError(
            `Can't update challenge results for event with challenges disabled`,
        )
    }
    if (event.challenges.indexOf(challenge) === -1) {
        throw new ForbiddenError(
            `${challenge} is not a valid challenge for event ${event.name}`,
        )
    }
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            challenge,
        },
        {
            rankings,
        },
        {
            upsert: true,
        },
    )
}

controller.getOverallResults = event => {
    console.log('>>>> Getting OVERALL results for event', event.slug)
    return Rankings.findOne({
        event: event._id,
        tag: 'overall',
    })
}

controller.updateOverallResults = (event, rankings) => {
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            tag: 'overall',
        },
        {
            rankings,
        },
        {
            upsert: true,
        },
    )
}

controller.getAllResultsForEvent = async eventSlug => {
    console.log('>>>> Getting ALL results for event', eventSlug)
    const event = await EventController.getEventBySlug(eventSlug)
    const raw = await Rankings.find({ event: event._id })
    const result = {
        overall: null,
        challenges: {},
        tracks: {},
    }

    raw.forEach(rankingsObj => {
        if (rankingsObj.tag === 'overall') {
            result.overall = rankingsObj
        }
        if (rankingsObj.challenge) {
            result.challenges[rankingsObj.challenge] = rankingsObj
        }

        if (rankingsObj.track) {
            result.tracks[rankingsObj.track] = rankingsObj
        }
    })

    return result
}

controller.resetAllResults = async event => {
    const results = await controller.generateAllResults(event)

    if (results.overall) {
        await controller.updateOverallResults(event, results.overall)
    }

    if (results.tracks) {
        const tracks = Object.keys(results.tracks)
        await Promise.each(tracks, track => {
            return controller.updateTrackResults(
                event,
                track,
                results.tracks[track],
            )
        })
    }
}

/** Generate all results types for the event */
controller.generateAllResults = async event => {
    /** Generate all results */
    const [tracks, overall] = await Promise.all([
        controller.generateTrackResultsAll(event),
        controller.generateOverallResults(event),
    ])
    return {
        tracks,
        overall,
    }
}

/** Generate overall results for the event */
controller.generateOverallResults = async event => {
    if (event.tracksEnabled) {
        /** Generate results based on finalist review method */
        switch (event.overallReviewMethod) {
            case OverallReviewingMethods.finalsPublicVoting.id: {
                const voteTotals = await WinnerVoteController.getVotesForEvent(
                    event,
                )
                return voteTotals.map(({ project }) => project)
            }
            case OverallReviewingMethods.finalsManualSelection.id: {
                /** Generate arbitrary results based on selected finalists, should be manually edited */
                console.log('Generating results based on finalists')
                return []
            }
            case OverallReviewingMethods.noOverallWinner.id: {
                /** The event has no overall winner, skip this */
                console.log('Event has no overall winner')
                return []
            }
            default: {
                /** No overall reviewing method defined, skip this */
                console.log('No overall reviewing method defined')
                return []
            }
        }
    } else {
        /** Generate overall results based on selected reviewing method */
        switch (event.reviewMethod) {
            case ReviewingMethods.gavelPeerReview.id: {
                const gavelResults = await GavelController.getResults(event._id)
                return gavelResults.map(({ project }) => project)
            }
            case ReviewingMethods.manualReview.id: {
                /** Skip generating results, no reviewing method defined
                 * Manual reviewing selected, cannot automatically generate results
                 */
                return []
            }
            default: {
                /** No reviewing method defined, skip this */
                console.log('No reviewing method defined')
                return []
            }
        }
    }
}

/** Generate the results for a single track */
controller.generateTrackResults = async (event, trackSlug) => {
    const track = _.find(event.tracks || [], t => t.slug === trackSlug)
    if (!track) {
        console.log(
            `Event ${event.name} has no track with the slug ${trackSlug}`,
        )
        return []
    }
    const gavelResults = await GavelController.getResults(event._id, trackSlug)
    return gavelResults.map(({ project }) => project)
}

/** Generate the results for all tracks */

controller.generateTrackResultsAll = async event => {
    if (!event.tracksEnabled || !event.tracks.length === 0) {
        // No tracks enabled, skipping track results generation
        return null
    }
    return Promise.reduce(
        event.tracks,
        async (results, track) => {
            const trackResults = await controller.generateTrackResults(
                event,
                track.slug,
            )
            results[track.slug] = trackResults
            return results
        },
        {},
    )
}

module.exports = controller
