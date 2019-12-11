const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');
const UserDetailsConfigSchema = require('../../common/schemas/UserDetailsConfig');
const RegistrationQuestionSchema = require('../../common/schemas/RegistrationQuestion');
const TravelGrantConfigSchema = require('../../common/schemas/TravelGrantConfig');
const DiscordConfigSchema = require('../../common/schemas/DiscordConfig');
const AddressSchema = require('../../common/schemas/Address');
const TrackSchema = require('../../common/schemas/TrackSchema');
const ChallengeSchema = require('../../common/schemas/ChallengeSchema');
const allowPublishPlugin = require('../../common/plugins/allowPublish');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const uploadHelper = require('../../modules/upload/helper');

const { EventTypes, ReviewingMethods, OverallReviewingMethods } = require('@hackjunction/shared');

const EventSchema = new mongoose.Schema({
    /** Event info */
    name: {
        type: String,
        required: true,
        requiredForPublish: true,
        maxLength: 100,
        trim: true
    },
    description: {
        type: String,
        requiredForPublish: true,
        maxLength: 5000,
        trim: true
    },
    /** Times */
    timezone: {
        type: String,
        requiredForPublish: true
    },
    registrationStartTime: {
        type: Date,
        requiredForPublish: true
    },
    registrationEndTime: {
        type: Date,
        requiredForPublish: true
    },
    startTime: {
        type: Date,
        requiredForPublish: true
    },
    endTime: {
        type: Date,
        requiredForPublish: true
    },
    submissionsStartTime: {
        type: Date,
        requiredForPublish: true
    },
    submissionsEndTime: {
        type: Date,
        requiredForPublish: true
    },
    reviewingStartTime: {
        type: Date,
        requiredForPublish: true
    },
    reviewingEndTime: {
        type: Date,
        requiredForPublish: true
    },
    /** Event customisation */
    coverImage: CloudinaryImageSchema,
    logo: CloudinaryImageSchema,
    /** Event configuration */
    eventType: {
        type: String,
        enum: Object.keys(EventTypes),
        required: true,
        default: EventTypes.online.id
    },
    eventLocation: {
        type: AddressSchema,
        required: [
            function() {
                return this.eventType === EventTypes.physical.id;
            },
            `is required for physical events`
        ]
    },
    tracksEnabled: false,
    tracks: {
        type: [TrackSchema],
        default: [],
        validate: [
            function(val) {
                if (this.tracksEnabled) {
                    return val.length > 0;
                }
                return true;
            },
            'must have at least one item if tracks are enabled'
        ],
        required: [
            function() {
                return this.tracksEnabled;
            },
            'is required if tracks are enabled'
        ]
    },
    challengesEnabled: false,
    challenges: {
        type: [ChallengeSchema],
        default: [],
        validate: [
            function(val) {
                if (this.challengesEnabled) {
                    return val.length > 0;
                }
                return true;
            },
            'must have at least one item if challenges are enabled'
        ],
        required: [
            function() {
                return this.challengesEnabled;
            },
            'is required if challenges are enabled'
        ]
    },
    travelGrantConfig: {
        type: TravelGrantConfigSchema,
        default: TravelGrantConfigSchema
    },
    discordConfig: {
        type: DiscordConfigSchema,
        default: DiscordConfigSchema
    },
    reviewMethod: {
        type: String,
        enum: Object.keys(ReviewingMethods),
        required: true,
        default: ReviewingMethods.gavelPeerReview.id
    },
    overallReviewMethod: {
        type: String,
        enum: Object.keys(OverallReviewingMethods),
        required: [
            function() {
                return this.tracksEnabled;
            },
            'is required if tracks are enabled'
        ]
    },
    userDetailsConfig: {
        type: UserDetailsConfigSchema,
        default: UserDetailsConfigSchema
    },
    customQuestions: {
        type: [
            {
                label: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                description: String,
                conditional: String,
                questions: [RegistrationQuestionSchema]
            }
        ],
        default: []
    },
    tags: {
        type: [
            {
                label: String,
                color: String,
                description: String
            }
        ],
        default: []
    },
    /** System metadata */
    published: {
        type: Boolean,
        default: false,
        required: true
    },
    galleryOpen: {
        type: Boolean,
        default: false,
        required: true,
        validate: [
            function(v) {
                if (v === true) {
                    return this.published;
                }
                return true;
            },
            `must be published before the project gallery can be opened`
        ]
    },
    owner: {
        type: String,
        required: true
    },
    organisers: {
        type: [String],
        default: []
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        slugPaddingSize: 2
    },
    winners: {
        type: mongoose.Mixed,
        default: {}
    }
});

EventSchema.index(
    {
        slug: 1
    },
    {
        unique: true
    }
);

EventSchema.plugin(mongooseSlugPlugin, {
    tmpl: '<%=name%>',
    alwaysUpdateSlug: false,
    slugOptions: {
        custom: {
            "'": ''
        }
    }
});

EventSchema.plugin(allowPublishPlugin, {
    defaultPublished: false
});

EventSchema.plugin(updateAllowedPlugin, {
    blacklisted: ['__v', '_id', 'owner', 'createdAt', 'updatedAt', 'slug']
});

EventSchema.set('timestamps', true);

EventSchema.post('remove', async function(doc) {
    await uploadHelper.removeEventImages(doc.slug);
});

const Event = mongoose.model('Event', EventSchema);

Event.syncIndexes();

module.exports = Event;
