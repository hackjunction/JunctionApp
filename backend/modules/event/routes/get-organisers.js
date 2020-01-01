const { Auth } = require('@hackjunction/shared')
const _ = require('lodash')
const status = require('http-status')
const UserProfileController = require('../../user-profile/controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'GET',
        url: '/',
        preValidation: [fastify.events_isOwner],
        handler: async (request, reply) => {
            const { event } = request
            const userIds = _.concat(event.owner, event.organisers)
            const userProfiles = await UserProfileController.getUserProfiles(
                userIds
            )

            return reply.code(status.OK).sendData(userProfiles)
        },
        schema: {
            summary: 'Get organisers for event',
            description:
                'Gets the full user profiles for the owner and organisers of an event',
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description: 'A valid slug for an event',
                    },
                },
                ['slug']
            ),
            response: {
                [status.OK]: fastify.responseArray(status.OK, {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            description: 'The unique ID of a user',
                        },
                    },
                }),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })
}
