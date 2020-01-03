const TravelGrantDetails = require('./TravelGrantDetails')
const RegistrationAnswers = require('./RegistrationAnswers')
const RegistrationStatuses = require('../constants/registration-statuses')
const RegistrationTravelGrantStatuses = require('../constants/registration-travel-grant-statuses')

const schema = Object.freeze({
    $id: '/UserProfile',
    title: 'User Profile',
    description: 'A user profile with all properties available',
    type: 'object',
    properties: {
        event: {
            description: 'The ID of the Event',
            type: 'string',
        },
        user: {
            description: 'The ID of the User (Auth0 user id)',
            type: 'string',
        },
        status: {
            description: 'The status of the registration',
            type: 'string',
            enum: RegistrationStatuses.ids,
        },
        assignedTo: {
            description:
                'The organiser this registration has been assigned to for review (Auth0 user id)',
            type: 'string',
        },
        rating: {
            description: 'The rating of this registration',
            type: 'number',
        },
        ratedBy: {
            description:
                'The organiser who has last edited the rating of this registration (Auth0 user id)',
            type: 'string',
        },
        tags: {
            description: 'Tags assigned to this registration',
            type: 'array',
            items: {
                type: 'string',
            },
        },
        answers: {
            description: `The answers submitted in the registration form`,
            type: 'object',
            properties: {
                $ref: RegistrationAnswers.$id,
            },
        },
        travelGrant: {
            description:
                'The amount of travel grant this registration is eligible for',
            type: 'number',
        },
        travelGrantStatus: {
            description: 'The status of the travel grant application',
            type: 'string',
            enum: RegistrationTravelGrantStatuses.ids,
        },
        travelGrantDetails: {
            description: 'The travel grant application',
            type: 'object',
            properties: {
                $ref: TravelGrantDetails.$id,
            },
        },
        travelGrantComment: {
            description: `The organisers' comments on the travel grant application`,
            type: 'string',
        },
        travelGrantAmount: {
            description:
                'The final confirmed amount of the travel grant (to be paid)',
            type: 'number',
        },
    },
})

module.exports = schema
