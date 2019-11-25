const GavelHelper = {};

/** Generate track placement achievements */
GavelHelper.generateTrackPlacementAchievements = event => {
    if (!event.tracksEnabled || event.tracks.length === 0) {
        return [];
    }
};

module.exports = GavelHelper;
