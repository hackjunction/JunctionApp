const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');
const UserDetailsConfigSchema = require('../../common/schemas/UserDetailsConfig');
const RegistrationQuestionSchema = require('../../common/schemas/RegistrationQuestion');
const TravelGrantConfigSchema = require('../../common/schemas/TravelGrantConfig');
const DiscordConfigSchema = require('../../common/schemas/DiscordConfig');
const TracksConfigSchema = require('../../common/schemas/TracksConfig');
const AddressSchema = require('../../common/schemas/Address');
const allowPublishPlugin = require('../../common/plugins/allowPublish');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const uploadHelper = require('../../modules/upload/helper');

const { EventTypes, ReviewingMethods } = require('@hackjunction/shared');

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
    travelGrantConfig: {
        type: TravelGrantConfigSchema,
        default: TravelGrantConfigSchema
    },
    tracksConfig: {
        type: TracksConfigSchema,
        default: TracksConfigSchema
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
    userDetailsConfig: {
        type: UserDetailsConfigSchema,
        default: UserDetailsConfigSchema
    },
    customQuestions: [
        {
            label: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true,
                unique: true
            },
            description: String,
            conditional: String,
            questions: [RegistrationQuestionSchema]
        }
    ],
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

module.exports = Event;
