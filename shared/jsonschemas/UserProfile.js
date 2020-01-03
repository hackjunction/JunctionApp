const RegistrationFieldsNew = require('../constants/RegistrationFields')

const properties = {
    userId: {
        title: 'User ID',
        description: 'The Auth0 userId of the user',
        type: 'string',
    },
    avatar: {
        title: 'User avatar',
        description: 'The avatar image of the user',
        type: 'string',
        format: 'uri',
    },
    registrations: {
        title: 'Registrations',
        description: 'A list of events the user has registered to',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                todo: {
                    type: 'string',
                },
            },
        },
    },
    recruiterEvents: {
        title: 'Recruiter events',
        description:
            'If the user is a recruiter, the list of events which they have recruiter access to',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                todo: {
                    type: 'string',
                },
            },
        },
    },
    recruiterOrganisation: {
        title: 'Recruiter organisation',
        description:
            'If the user is a recruiter, the organisation which they belong to',
        type: 'string',
    },
}

/** Add dynamic fields based on possible registration questions that are synced to the user's profile */
const fields = Object.keys(RegistrationFieldsNew.Fields)
const requiredFields = []
fields.forEach(field => {
    const value = RegistrationFieldsNew.Fields[field]

    if (
        value.config &&
        value.config.userProfile &&
        value.config.userProfile.field &&
        value.config.userProfile.schema
    ) {
        // console.log(field, Object.keys(value.schema))
        properties[value.config.userProfile.field] = value.schema

        if (value.config.defaultRequired && !value.config.editable) {
            requiredFields.push(value.config.userProfile.field)
        }
    }
})

const schema = Object.freeze({
    $id: '/UserProfile',
    title: 'User Profile',
    description: 'A user profile with all properties available',
    type: 'object',
    properties,
    required: ['userId'],
})

module.exports = schema
