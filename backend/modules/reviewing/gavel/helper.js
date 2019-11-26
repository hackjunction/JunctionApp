const _ = require('lodash');
const GavelProject = require('./Project');

const GavelHelper = {};

/** Generate track placement achievements */
GavelHelper.generateTrackPlacementAchievements = async event => {
    if (!event.tracksEnabled || event.tracks.length === 0) {
        return [];
    }

    const projects = await GavelProject.find({
        event: event._id
    });

    const byTrack = _.groupBy(projects, 'track');

    /** Generate achievements for each track */
    Object.keys(byTrack).forEach(slug => {
        const trackProjects = byTrack[slug];
        const count = trackProjects.length;
        const percentile50 = Math.floor(count / 2);
        const sorted = _.sortBy(trackProjects, p => {
            if (p.active) {
                return p.mu * -1;
            }
            return Infinity;
        });
        sorted.forEach((project, index) => {
            if (index === 0) {
                //Track winner
            } else if (index === 1) {
                //Track 2nd
            } else if (index === 2) {
                //Track 3rd
            } else if (index < 10 && count >= 15) {
                //Top 10 in track
            } else if (index >= 10 && index <= percentile50 && count > 21) {
                //Top 50% in track
            }
        });
    });

    return [];
};

GavelHelper.generatePlacementAchievements = async event => {
    if (event.tracksEnabled) {
        return [];
    }

    const projects = await GavelProject.find({ event: event._id });
    const count = projects.length;
    const percentile50 = Math.floor(count / 2);
    const sorted = _.sortBy(projects, p => {
        if (p.active) {
            return p.mu * -1;
        }
        return Infinity;
    });

    sorted.forEach((project, index) => {
        if (index === 0) {
            // Main winner
        } else if (index === 1) {
            // 2nd place
        } else if (index === 2) {
            // 3rd place
        } else if (index < 10 && count >= 15) {
            // Top 10 overall
        } else if (index >= 10 && index <= percentile50 && count > 21) {
            // Top 50% overall
        }
    });

    return [];
};

module.exports = GavelHelper;
