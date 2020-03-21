const mongoose = require('mongoose')
const Promise = require('bluebird')
const { AchievementTypes } = require('@hackjunction/shared')
const Team = require('../team/model')
const Project = require('../project/model')

const AchievementSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    user: {
        type: String,
    },
    type: {
        type: String,
        enum: Object.keys(AchievementTypes),
        required: true,
    },
    rank: {
        type: Number,
    },
    value: {
        type: String,
    },
})

AchievementSchema.index({
    event: 1,
    project: 1,
    user: 1,
})

AchievementSchema.set('timestamps', true)

AchievementSchema.statics.clearTrackPlacementAchievements = async function(
    event
) {
    return Achievement.remove({
        event: event._id,
        type: AchievementTypes.trackPlacement.id,
    })
}
AchievementSchema.statics.createTrackPlacementAchievements = async function(
    event,
    projectId,
    track,
    placement
) {
    const project = await Project.findById(projectId)
    const members = await Team.getMembers(project.team)

    return Promise.map(members, user => {
        const achievement = new Achievement({
            event: event._id,
            project: project.project,
            user,
            type: AchievementTypes.trackPlacement.id,
            rank: placement,
            value: track,
        })

        return achievement.save()
    })
}

AchievementSchema.statics.clearOverallPlacementAchievements = async function(
    event
) {
    return Achievement.remove({
        event: event._id,
        type: AchievementTypes.overallPlacement.id,
    })
}
AchievementSchema.statics.createOverallPlacementAchievements = async function(
    event,
    projectId,
    placement
) {
    const project = await Project.findById(projectId)
    const members = await Team.getMembers(project.team)

    return Promise.map(members, user => {
        const achievement = new Achievement({
            event: event._id,
            project: project.project,
            user,
            type: AchievementTypes.overallPlacement.id,
            rank: placement,
        })

        return achievement.save()
    })
}

const Achievement = mongoose.model('Achievement', AchievementSchema)

module.exports = Achievement
