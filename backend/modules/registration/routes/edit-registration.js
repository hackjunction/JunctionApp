const status = require('http-status')

const RegistrationController = require('../controller')

module.exports = async fastify => {
    fastify.authenticatedRoute([], {
        method: 'PATCH',
        url: '/',
        preValidation: [fastify.events_canRegister],
        handler: async (request, reply) => {
            const registration = await RegistrationController.updateRegistration(
                request.user,
                request.event,
                request.body
            )
            /** Mirror the changes to the user's profile here */
            // TODO: UserProfileController.updateUserProfile(registration.answers, req.user.sub)
            return reply.code(status.OK).sendData(registration)
        },
        schema: {
            summary: 'TODO: Edit own registration',
            description: 'Edit your registration for a given event',
            tags: ['Registrations'],
            params: fastify.requestParams(
                {
                    slug: {
                        type: 'string',
                        description:
                            'The slug of the event to edit your registration for',
                    },
                },
                ['slug']
            ),
            body: fastify.refs.RegistrationAnswers,
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Registration
                ),
            },
            errorResponses: [
                status.BAD_REQUEST,
                status.FORBIDDEN,
                status.NOT_FOUND,
            ],
        },
    })
}
