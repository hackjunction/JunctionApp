const status = require('http-status')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const userProfile = UserProfileController.getUserProfile(
                request.user.sub
            )
            return reply.code(status.OK).sendData(userProfile)
        },
        schema: {
            summary: 'Get own user profile',
            description: 'Get your own user profile',
            tags: ['User Profiles'],
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.UserProfile
                ),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })
}
