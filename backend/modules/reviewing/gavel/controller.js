const _ = require('lodash');
const GavelAnnotator = require('./Annotator');
const GavelDecision = require('./Decision');
const GavelProject = require('./Project');

const TeamController = require('../../team/controller');
const ProjectController = require('../../project/controller');
const { ForbiddenError } = require('../../../common/errors/errors');
const Maths = require('./maths');

const controller = {};

controller.initAnnotator = async (event, userId) => {
    const team = await TeamController.getTeam(event._id, userId).catch(() => null);
    const [projects, annotators] = await Promise.all([
        ProjectController.getAllProjectsForEvent(event._id),
        GavelAnnotator.find({ event: event._id })
    ]);
    const ownProject = team ? _.find(projects, project => project.team === team._id) : null;

    /** If the event is using tracks, figure out the track that needs reviewers the most */
    let assignedTrack;
    if (event.tracksEnabled && event.tracks && event.tracks.length > 0) {
        const projectsPerTrack = _.countBy(projects, 'track');
        const annotatorsPerTrack = _.countBy(annotators, 'track');
        const tracksSorted = _.sortBy(event.tracks, track => {
            const projectCount = projectsPerTrack[track.slug] || 1;
            const annotatorCount = annotatorsPerTrack[track.slug] || 0;

            return (annotatorCount * 1.0) / projectCount;
        });

        if (tracksSorted.length === 1) {
            assignedTrack = tracksSorted[0].slug;
        } else {
            if (ownProject && ownProject.track) {
                for (let track of tracksSorted) {
                    if (track.slug !== ownProject.track) {
                        assignedTrack = track.slug;
                        break;
                    }
                }
            } else {
                assignedTrack = tracksSorted[0].slug;
            }
        }
    }

    const annotator = new GavelAnnotator({
        user: userId,
        event: event._id,
        team: team ? team._id : null,
        track: assignedTrack
    });

    const savedAnnotator = await annotator.assign();
    return savedAnnotator.assignNextProject();
};

controller.submitVote = async (event, userId, winningProjectId) => {
    // Get the annotator profile for a user
    const annotator = await GavelAnnotator.findOne({ event: event._id, user: userId });

    if (winningProjectId !== annotator.next && winningProjectId !== annotator.prev) {
        throw new ForbiddenError(
            `Invalid choice for winning project, must be one of: ${annotator.prev}, ${annotator.next}`
        );
    }

    // Throws error if annotator can't vote, handled globally
    await annotator.canVote();

    const losingProjectId = winningProjectId === annotator.next ? annotator.prev : annotator.next;

    const [loser, winner] = await Promise.all([
        GavelProject.findById(losingProjectId),
        GavelProject.findById(winningProjectId)
    ]);

    const {
        updated_alpha,
        updated_beta,
        updated_mu_winner,
        updated_mu_loser,
        updated_sigma_sq_winner,
        updated_sigma_sq_loser
    } = Maths.update(annotator.alpha, annotator.beta, winner.mu, winner.sigma_sq, loser.mu, loser.sigma_sq);

    annotator.alpha = updated_alpha;
    annotator.beta = updated_beta;

    loser.mu = updated_mu_loser;
    loser.sigma_sq = updated_sigma_sq_loser;

    winner.mu = updated_mu_winner;
    winner.sigma_sq = updated_sigma_sq_winner;

    const decision = new GavelDecision({
        annotator: annotator._id,
        event: event._id,
        winner: winner._id,
        loser: loser._id
    });

    const [updatedAnnotator] = await Promise.all([
        annotator.assignNextProject(),
        loser.save(),
        winner.save(),
        decision.save()
    ]);

    return updatedAnnotator;
};
