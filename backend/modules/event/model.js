const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const CloudinaryImageSchema = require('../../common/schemas/CloudinaryImage');
const UserDetailsConfigSchema = require('../../common/schemas/UserDetailsConfig');
const RegistrationQuestionSchema = require('../../common/schemas/RegistrationQuestion');
const allowPublishPlugin = require('../../common/plugins/allowPublish');
const updateAllowedPlugin = require('../../common/plugins/updateAllowed');
const uploadHelper = require('../../modules/upload/helper');

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
    location: {
        type: String,
        required: false,
        maxLength: 100,
        trim: true
    },
    /** Times */
    timezone: {
        type: String,
        required: false,
        requiredForPublish: true
    },
    registrationStartTime: {
        type: Date,
        required: false,
        requiredForPublish: true
    },
    registrationEndTime: {
        type: Date,
        required: false,
        requiredForPublish: true
    },
    startTime: {
        type: Date,
        required: false,
        requiredForPublish: true
    },
    endTime: {
        type: Date,
        required: false,
        requiredForPublish: true
    },
    submissionsStartTime: {
        type: Date,
        required: false
    },
    submissionsEndTime: {
        type: Date,
        required: false
    },
    /** Event customisation */
    coverImage: CloudinaryImageSchema,
    logo: CloudinaryImageSchema,
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
