const { JsonSchemas } = require('@hackjunction/shared')
const status = require('http-status')
const { BadRequestError } = require('../../../common/errors/errors')
const UserProfileController = require('../controller')
const TeamController = require('../../team/controller')

module.exports = async fastify => {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            if (request.query.userIds) {
                const userProfiles = await UserProfileController.getUserProfilesPublic(
                    request.query.userIds
                )
                return reply.code(status.OK).send(userProfiles)
            }
            if (request.query.teamId) {
                const teamMembers = await TeamController.getTeamMembers(
                    request.query.teamId
                )
                const userProfiles = await UserProfileController.getUserProfilesPublic(
                    teamMembers
                )
                return reply.code(status.OK).sendData(userProfiles)
            }
            throw new BadRequestError(
                `Please supply one of the following query parameters: ['userIds', 'teamId']`
            )
        },
        schema: {
            summary: 'Get public user profiles',
            description:
                'Get public user profiles by a list of userIds or a teamId',
            tags: ['User Profiles'],
            query: fastify.requestParams({
                userIds: {
                    description: 'A list of user IDs',
                    type: 'array',
                    items: JsonSchemas.UserProfile.properties.userId,
                },
                teamId: {
                    description:
                        'OR a team ID (ignored if `userIds` is defined)',
                    type: 'string',
                },
            }),
            response: {
                [status.OK]: fastify.responseArray(
                    status.OK,
                    fastify.refs.UserProfile
                ),
                [status.BAD_REQUEST]: fastify.responseEmpty(status.BAD_REQUEST),
                [status.NOT_FOUND]: fastify.responseEmpty(status.NOT_FOUND),
            },
        },
    })
}
