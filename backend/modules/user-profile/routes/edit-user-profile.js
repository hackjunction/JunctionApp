const status = require('http-status')
const { JsonSchemas } = require('@hackjunction/shared')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'PATCH',
        url: '/',
        handler: async (request, reply) => {
            const updatedUserProfile = await UserProfileController.updateUserProfile(
                request.body,
                request.user.sub
            )
            return reply.code(status.OK).sendData(updatedUserProfile)
        },
        schema: {
            summary: 'Edit own user profile',
            description: 'Edit your own user profile',
            tags: ['User Profiles'],
            body: fastify.requestParams(
                { ...JsonSchemas.UserProfile.properties },
                []
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.UserProfile
                ),
            },
        },
    })
}
