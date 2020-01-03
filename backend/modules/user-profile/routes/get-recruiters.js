const status = require('http-status')
const { Auth } = require('@hackjunction/shared')
const UserProfileController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_RECRUITMENT], {
        method: 'GET',
        url: '/',
        handler: async (request, reply) => {
            const userProfiles = await UserProfileController.getRecruiters()
            return reply.code(status.OK).sendData(userProfiles)
        },
        schema: {
            summary: 'Get recruiter profiles',
            description:
                'Get the user profiles of all users with recruiter access',
            tags: ['User Profiles', 'Recruitment'],
            response: {
                [status.OK]: fastify.responseArray(
                    status.OK,
                    fastify.refs.UserProfile
                ),
            },
        },
    })
}
