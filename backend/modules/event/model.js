const mongoose = require('mongoose')
const mongooseSlugPlugin = require('mongoose-slug-plugin')
const {
    EventTypes,
    ReviewingMethods,
    OverallReviewingMethods,
} = require('@hackjunction/shared')
// const AddressSchema = require('@hackjunction/shared/schemas/Address')
const ChallengeSchema = require('@hackjunction/shared/schemas/Challenge')
const CloudinaryImageSchema = require('@hackjunction/shared/schemas/CloudinaryImage')
const Certificate = require('@hackjunction/shared/schemas/Certificate')
const RegistrationSectionSchema = require('@hackjunction/shared/schemas/RegistrationSection')
const TrackSchema = require('@hackjunction/shared/schemas/Track')
const TravelGrantConfigSchema = require('@hackjunction/shared/schemas/TravelGrantConfig')
const UserDetailsConfigSchema = require('@hackjunction/shared/schemas/UserDetailsConfig')
const EventTagSchema = require('@hackjunction/shared/schemas/EventTag')
const RegistrationConfigSchema = require('@hackjunction/shared/schemas/RegistrationConfig')
const AddressSchema = require('@hackjunction/shared/schemas/Address')
const WebhookSchema = require('@hackjunction/shared/schemas/Webhook')
const EventThemeSchema = require('@hackjunction/shared/schemas/EventTheme')
const EventTimelineSchema = require('@hackjunction/shared/schemas/EventTimeline')
const allowPublishPlugin = require('../../common/plugins/allowPublish')
const updateAllowedPlugin = require('../../common/plugins/updateAllowed')
const uploadHelper = require('../upload/helper')

const EventSchema = new mongoose.Schema({
    /** Event info */
    name: {
        type: String,
        required: true,
        requiredForPublish: true,
        maxLength: 100,
        trim: true,
    },
    description: {
        type: String,
        requiredForPublish: true,
        maxLength: 5000,
        trim: true,
    },
    /** Times */
    timezone: {
        type: String,
        requiredForPublish: true,
    },
    registrationStartTime: {
        type: Date,
        requiredForPublish: true,
    },
    registrationEndTime: {
        type: Date,
        requiredForPublish: true,
    },
    startTime: {
        type: Date,
        requiredForPublish: true,
    },
    endTime: {
        type: Date,
        requiredForPublish: true,
    },
    submissionsStartTime: {
        type: Date,
        requiredForPublish: true,
    },
    submissionsEndTime: {
        type: Date,
        requiredForPublish: true,
    },
    reviewingStartTime: {
        type: Date,
        requiredForPublish: true,
    },
    reviewingEndTime: {
        type: Date,
        requiredForPublish: true,
    },
    /** Make this a date type also */
    finalsActive: {
        type: Boolean,
        default: false,
    },
    /** Event customisation */
    coverImage: CloudinaryImageSchema.mongoose,
    logo: CloudinaryImageSchema.mongoose,
    certificate: Certificate.mongoose,
    /** Event configuration */
    eventType: {
        type: String,
        enum: Object.keys(EventTypes),
        required: true,
        default: EventTypes.online.id,
    },
    eventLocation: {
        type: AddressSchema.mongoose,
        required: [
            function () {
                return this.eventType === EventTypes.physical.id
            },
            `is required for physical events`,
        ],
    },
    tracksEnabled: false,
    tracks: {
        type: [TrackSchema.mongoose],
        default: [],
        validate: [
            function (val) {
                if (this.tracksEnabled) {
                    return val.length > 0
                }
                return true
            },
            'must have at least one item if tracks are enabled',
        ],
        required: [
            function () {
                return this.tracksEnabled
            },
            'is required if tracks are enabled',
        ],
    },
    challengesEnabled: false,
    challenges: {
        type: [ChallengeSchema.mongoose],
        default: [],
        validate: [
            function (val) {
                if (this.challengesEnabled) {
                    return val.length > 0
                }
                return true
            },
            'must have at least one item if challenges are enabled',
        ],
        required: [
            function () {
                return this.challengesEnabled
            },
            'is required if challenges are enabled',
        ],
    },
    allowProjectSubmissionsPerChallenge: {
        type: Boolean,
        default: false,
    },
    allowVoteOnOwnProject: {
        type: Boolean,
        default: false,
    },
    // Mongoose will cast the empty object to match `TravelGrantConfigSchema`, so it will set defaults
    travelGrantConfig: {
        type: TravelGrantConfigSchema.mongoose,
        default: () => ({}),
    },
    reviewMethod: {
        type: String,
        required: true,
        default: ReviewingMethods.gavelPeerReview.id,
        enum: Object.keys(ReviewingMethods),
    },
    overallReviewMethod: {
        type: String,
        enum: Object.keys(OverallReviewingMethods),
        required: [
            function () {
                return this.tracksEnabled
            },
            'is required if tracks are enabled',
        ],
    },
    userDetailsConfig: {
        /** Deprecated, removed in migration 00-registration-questions */
        type: UserDetailsConfigSchema.mongoose,
    },
    registrationConfig: {
        /** Introduced in favor of userDetailsConfig in 00-registration-questions */
        // Mongoose will cast the empty object to match `RegistrationConfigSchema`, so it will set defaults
        type: RegistrationConfigSchema.mongoose,
        default: () => ({ description: '' }),
    },
    customQuestions: {
        type: [RegistrationSectionSchema.mongoose],
    },
    tags: {
        type: [EventTagSchema.mongoose],
        default: [],
    },
    webhooks: {
        type: [WebhookSchema.mongoose],
        default: [],
    },
    eventTimeline: {
        type: EventTimelineSchema.mongoose,
        default: { items: [] },
    },
    metaDescription: {
        type: String,
        default: '',
    },
    /** System metadata */
    published: {
        type: Boolean,
        default: false,
        required: true,
    },
    galleryOpen: {
        type: Boolean,
        default: false,
        required: true,
        validate: [
            function (val) {
                if (val === true) {
                    return this.published
                }
                return true
            },
            `must be published before the project gallery can be opened`,
        ],
    },
    owner: {
        type: String,
        required: true,
    },
    organisers: {
        type: [String],
        default: [],
    },
    organizations: {
        type: [String],
        default: [],
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slugPaddingSize: 2,
    },
    winners: {
        type: mongoose.Mixed,
        default: {},
    },
    finalists: {
        type: [String],
        default: [],
    },
    challenge_instructions: {
        type: String,
    },
    faq: {
        type: String,
    },
    demoInstructions: {
        type: String,
    },
    demoLabel: {
        type: String,
        default: 'Demo URL',
    },
    demoHint: {
        type: String,
        default:
            'Add the link of the working version of your project. Depending on the event, this could be a link to an API, a link to file or a presentation. Make sure the link is accessible for humans, as well as machines',
    },
    demoPlaceholder: {
        type: String,
        default: 'https://...',
    },
    eventPrivacy: {
        type: String,
    },
    eventTerms: {
        type: String,
    },
    frontPagePriority: {
        type: Number,
        default: 0,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    theme: { type: EventThemeSchema.mongoose, default: {} },
})

EventSchema.index(
    {
        slug: 1,
    },
    {
        unique: true,
    },
)

EventSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": '',
        },
    },
})

EventSchema.plugin(allowPublishPlugin, {
    defaultPublished: false,
})

EventSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'owner', 'createdAt', 'updatedAt', 'slug'],
})

EventSchema.set('timestamps', true)

EventSchema.post('remove', async doc => {
    await uploadHelper.removeEventImages(doc.slug)
})

const Event = mongoose.model('Event', EventSchema)

module.exports = Event
