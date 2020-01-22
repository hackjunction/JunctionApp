const mongoose = require('mongoose')
const _ = require('lodash')
const { ReviewingMethods } = require('@hackjunction/shared')
const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const AchievementSchema = require('../../common/schemas/Achievement')
const GavelController = require('../reviewing/gavel/controller')

const ProjectSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    punchline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    technologies: [String],
    source: {
        type: String,
        required: true,
    },
    sourcePublic: {
        type: Boolean,
        required: true,
        default: true,
    },
    demo: {
        type: String,
    },
    images: {
        type: [CloudinaryImageSchema.mongoose],
    },
    challenges: {
        type: [String],
    },
    track: {
        type: String,
    },
    location: {
        type: String,
    },
    achievements: [AchievementSchema],
})

ProjectSchema.set('timestamps', true)

/* Only allow a single project per team per event */
ProjectSchema.index(
    {
        event: 1,
        team: 1,
    },
    {
        unique: true,
    }
)

/* We'll commonly query projects by track and event, so create a compound index for that */
ProjectSchema.index({
    track: 1,
    event: 1,
})

ProjectSchema.methods.getPreview = function() {
    return _.omit(this, ['description'])
}

ProjectSchema.post('save', async function(doc, next) {
    mongoose
        .model('Event')
        .findById(this.event)
        .then(event => {
            switch (event.reviewMethod) {
                /** If using Gavel peer review, make sure a GavelProject exists for each project, and is updated accordingly */
                case ReviewingMethods.gavelPeerReview.id: {
                    GavelController.ensureGavelProject(doc)
                    break
                }
                default: {
                    /** By default, no action needed */
                }
            }
        })

    next()
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
