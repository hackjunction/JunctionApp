const Rankings = require('./model');

const { ForbiddenError } = require('../../common/errors/errors');

const controller = {};

controller.getTrackResults = (event, track) => {
    return Rankings.findOne({
        event: event._id,
        track
    });
};

controller.updateTrackResults = (event, track, rankings) => {
    if (!event.tracksEnabled) {
        throw new ForbiddenError(`Can't update track results for event with tracks disabled`);
    }
    if (!event.tracks.indexOf(track) === -1) {
        throw new ForbiddenError(`${track} is not a valid track for event ${event.name}`);
    }
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            track
        },
        {
            rankings
        },
        {
            upsert: true
        }
    );
};

controller.getChallengeResults = (event, challenge) => {
    return Rankings.findOne({
        event: event._id,
        challenge
    });
};

controller.updateChallengeResults = (event, challenge, rankings) => {
    if (!event.challengesEnabled) {
        throw new ForbiddenError(`Can't update challenge results for event with challenges disabled`);
    }
    if (event.challenges.indexOf(challenge) === -1) {
        throw new ForbiddenError(`${challenge} is not a valid challenge for event ${event.name}`);
    }
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            challenge
        },
        {
            rankings
        },
        {
            upsert: true
        }
    );
};

controller.getOverallResults = event => {
    return Rankings.findOne({
        event: event._id,
        tag: 'overall'
    });
};

controller.updateOverallResults = (event, rankings) => {
    return Rankings.findOneAndUpdate(
        {
            event: event._id,
            tag: 'overall'
        },
        {
            rankings
        },
        {
            upsert: true
        }
    );
};

controller.getAllResultsForEvent = event => {
    return Rankings.find({
        event: event._id
    });
};

module.exports = controller;
