const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_RECRUITMENT], {
        method: 'PATCH',
        url: '/',
        handler: async (request, reply) => {
            const userProfile = await UserProfileController.updateRecruiter(
                request.params.recruiterId,
                request.body.events,
                request.body.organisation
            )
            return reply.code(status.OK).sendData(userProfile)
        },
        schema: {
            summary: `Edit recruiter`,
            description: `Edit a user's access to recruitment and/or recruiter organisation. Also ensures that the user gets the \`${Auth.Roles.RECRUITER}\` role if they don't already have it.`,
            tags: ['User Profiles', 'Recruitment'],
            params: fastify.requestParams(
                {
                    recruiterId: {
                        description: 'The user ID to edit',
                        type: 'string',
                    },
                },
                ['recruiterId']
            ),
            body: fastify.requestParams(
                {
                    events: {
                        description:
                            'A list of event IDs this user should have recruiter access to',
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    organisation: {
                        description:
                            'The organisation this user belongs to (e.g. BigCorp Ltd.)',
                        type: 'string',
                    },
                },
                ['events', 'organisation']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.UserProfile
                ),
            },
            errorResponses: [status.BAD_REQUEST],
        },
    })
}
