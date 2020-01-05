const status = require('http-status')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const userProfiles = await UserProfileController.searchUsers(
                request.query.terms
            )
            return reply.code(status.OK).sendData(userProfiles)
        },
        schema: {
            summary: 'Search user profiles',
            description:
                'Search user profiles by name or email. Performs a full-text search and returns the closest matches, if any.',
            tags: ['User Profiles'],
            query: fastify.requestParams(
                {
                    terms: {
                        description: 'The string to search against',
                        type: 'string',
                    },
                },
                ['terms']
            ),
            response: {
                [status.OK]: fastify.responseArray(
                    status.OK,
                    fastify.refs.UserProfile
                ),
            },
            errorResponses: [status.BAD_REQUEST],
        },
    })
}
