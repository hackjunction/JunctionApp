const status = require('http-status')
const { JsonSchemas } = require('@hackjunction/shared')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'POST',
        url: '/',
        handler: async (request, reply) => {
            const userProfile = await UserProfileController.createUserProfile(
                request.body,
                request.user.sub
            )

            return reply.code(status.CREATED).sendData(userProfile)
        },
        schema: {
            summary: 'Create own user profile',
            description:
                'Create your own user profile, as the final step of the user creation process',
            tags: ['User Profiles'],
            body: fastify.requestParams(
                {
                    firstName: JsonSchemas.UserProfile.properties.firstName,
                    lastName: JsonSchemas.UserProfile.properties.lastName,
                    email: JsonSchemas.UserProfile.properties.email,
                    avatar: JsonSchemas.UserProfile.properties.avatar,
                },
                ['firstName', 'lastName', 'email', 'avatar']
            ),
            response: {
                [status.CREATED]: fastify.responseObject(
                    status.CREATED,
                    fastify.refs.UserProfile
                ),
            },
        },
    })
}
