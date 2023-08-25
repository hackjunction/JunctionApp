const mongoose = require('mongoose')
const _ = require('lodash')
const { ReviewingMethods } = require('@hackjunction/shared')
const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const AchievementSchema = require('../../common/schemas/Achievement')
const GavelController = require('../reviewing/gavel/controller')
const WebhookService = require('../../common/services/webhook')
const CustomAnswer = require('@hackjunction/shared/schemas/CustomAnswer')
const ProjectDefaultFields = require('@hackjunction/shared/constants/project-default-fields')
// const AnswersSchema = require('@hackjunction/shared/schemas/Answers')

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
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    technologies: [String],
    source: {
        type: String,
    },
    sourcePublic: {
        type: Boolean,
        // required: true,
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
    hiddenMembers: {
        type: [String],
        default: [],
    },
    video: {
        type: String,
    },
    status: {
        type: String,
    },
    achievements: [AchievementSchema],
    submissionFormAnswers: {
        type: [CustomAnswer.mongoose],
    },
    // TODO default fields
    // enabledFields: {
    //     type: [String],
    //     default: ProjectDefaultFields,
    // },
})

ProjectSchema.set('timestamps', true)

/* Only allow a single project per team per event */
/* ProjectSchema.index(
    {
        event: 1,
        team: 1,
    },
    {
        unique: true,
    }
) */

/* We'll commonly query projects by track and event, so create a compound index for that */
ProjectSchema.index({
    track: 1,
    event: 1,
})

ProjectSchema.methods.getPreview = function () {
    return _.omit(this, ['description'])
}

ProjectSchema.methods.getExportData = function () {
    return {
        name: this.name || '',
        punchline: this.punchline || '',
        description: this.description || '',
        technologies: this.technologies.join(', ') || '',
        source: this.source || '',
        demo: this.demo || '',
        images: this.images.map(image => image.url).join(', ') || '',
        challenges: this.challenges.join(', ') || '',
        track: this.track || '',
        location: this.location || '',
        status: this.status || '',
        video: this.video || '',
    }
}

ProjectSchema.post('save', async function (doc, next) {
    const event = await mongoose.model('Event').findById(this.event)
    switch (event.reviewMethod) {
        /** If using Gavel peer review, make sure a GavelProject exists for each project, and is updated accordingly,
            updated to GavelProject only if it has status 'final'
         */
        case ReviewingMethods.gavelPeerReview.id: {
            GavelController.ensureGavelProject(doc)
            break
        }
        default: {
            /** By default, no action needed */
        }
    }
    WebhookService.triggerWebhooks('Project', 'save', doc, this.event)
    next()
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
