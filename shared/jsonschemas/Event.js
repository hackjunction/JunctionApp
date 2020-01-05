const EventTypes = require('../constants/event-types')

const CloudinaryImage = require('./CloudinaryImage')
const StreetAddress = require('./StreetAddress')
const EventTrack = require('./EventTrack')
const EventChallenge = require('./EventChallenge')
const UserId = require('./UserId')

module.exports = {
    $id: '/Event',
    title: 'Event',
    description: 'An event which includes all properties available',
    type: 'object',
    properties: {
        name: {
            title: 'Event name',
            description: 'The name of the event',
            type: 'string',
            minLength: 3,
            maxLength: 100,
        },
        description: {
            title: 'Description',
            description: 'A long description of the event (markdown supported)',
            type: 'string',
            maxLength: 5000,
        },
        slug: {
            title: 'Event slug',
            description: 'A unique slug for this event',
            type: 'string',
        },
        published: {
            title: 'Published',
            description: 'Whether this event is publically visible or not',
            type: 'boolean',
            default: false,
        },
        timezone: {
            title: 'Timezone',
            description: 'The timezone the event is happening in',
            type: 'string',
        },
        registrationStartTime: {
            title: 'Registration start time',
            description:
                'The date & time when registration for the event begins',
            type: 'string',
            format: 'date-time',
        },
        registrationEndTime: {
            title: 'Registration end time',
            description: 'The date & time when registration for the event ends',
            type: 'string',
            format: 'date-time',
        },
        startTime: {
            title: 'Event start time',
            description: 'The date & time when the event begins',
            type: 'string',
            format: 'date-time',
        },
        endTime: {
            title: 'Event end time',
            description: 'The date & time when the event ends',
            type: 'string',
            format: 'date-time',
        },
        submissionsStartTime: {
            title: 'Submissions start time',
            description: 'The date & time when project submissions begin',
            type: 'string',
            format: 'date-time',
        },
        submissionsEndTime: {
            title: 'Submissions end time',
            description: 'The date & time when project submissions close',
            type: 'string',
            format: 'date-time',
        },
        reviewingStartTime: {
            title: 'Reviewing start time',
            description: 'The date & time when the reviewing period begins',
            type: 'string',
            format: 'date-time',
        },
        reviewingEndTime: {
            title: 'Reviewing end time',
            description: 'The date & time when the reviewing period ends',
            type: 'string',
            format: 'date-time',
        },
        coverImage: {
            title: 'Cover image',
            description: 'A cover image for the event',
            $ref: CloudinaryImage.$id,
        },
        logo: {
            title: 'Logo',
            description: 'A logo for the event',
            $ref: CloudinaryImage.$id,
        },
        eventType: {
            title: 'Event type',
            description: 'The type of the event',
            type: 'string',
            enum: Object.keys(EventTypes),
            default: EventTypes.online.id,
        },
        eventLocation: {
            title: 'Event location',
            description:
                'The street address of the event. Required for events where eventType is physical',
            $ref: StreetAddress.$id,
        },
        tracksEnabled: {
            title: 'Tracks enabled?',
            description: 'Whether this event uses tracks or not',
            type: 'boolean',
            default: false,
        },
        tracks: {
            title: 'Tracks',
            description: 'The list of tracks in this event',
            type: 'array',
            items: {
                $ref: EventTrack.$id,
            },
        },
        challengesEnabled: {
            title: 'Challenges enabled?',
            description: 'Whether this event uses challenges or not',
            type: 'boolean',
            default: false,
        },
        challenges: {
            title: 'Challenges',
            description: 'The list of challenges in this event',
            type: 'array',
            items: {
                $ref: EventChallenge.$id,
            },
        },
        reviewMethod: {
            type: 'string',
            description:
                'The reviewing method used to decide the track winners of the event, if applicable.',
        },
        overallReviewMethod: {
            type: 'string',
            description:
                'The reviewing method used to decide the overall winners of the event, if applicable.',
        },
        userDetailsConfig: {
            type: 'object',
            description:
                'A configuration object containing the questions to be asked in the registration form',
            properties: {
                todo: {
                    type: 'string',
                },
            },
        },
        customQuestions: {
            type: 'array',
            description:
                'An array of additional custom questions to ask in the registration form',
            items: {
                type: 'object',
                properties: {
                    todo: {
                        type: 'string',
                    },
                },
            },
        },
        tags: {
            type: 'array',
            description:
                'An array of tags which can be used to label event participants',
            items: {
                type: 'object',
                properties: {
                    todo: {
                        type: 'string',
                    },
                },
            },
        },
        galleryOpen: {
            type: 'boolean',
            description:
                'Whether the project gallery for this event is open or not',
            default: false,
        },
        owner: {
            type: 'string',
            description: 'The owner of this event',
            $ref: UserId.$id,
        },
        organisers: {
            type: 'array',
            description: `The organisers of this event`,
            items: {
                $ref: UserId.$id,
            },
        },
        winners: {
            type: 'object',
            description: 'An object containing the results of this event',
            properties: {
                todo: {
                    type: 'string',
                },
            },
        },
    },
}
