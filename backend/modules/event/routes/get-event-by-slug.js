const { Auth } = require('@hackjunction/shared')
const status = require('http-status')

module.exports = async fastify => {
    fastify.authenticatedRoute([Auth.Permissions.MANAGE_EVENT], {
        method: 'GET',
        url: '/',
        preValidation: [fastify.events_isOrganiser],
        handler: async (request, reply) => {
            /** The preValidation middleware already attached
             *  the event to the request for us, so we can just return that.
             *  It will also throw a 404 for us if the event is not found.
             * */
            return reply.code(200).sendData(request.event)
        },
        schema: {
            summary: 'Get event by slug',
            description:
                'Get a full event by slug, as an owner or organiser of the event.',
            tags: ['Events'],
            params: fastify.requestParams(
                {
                    slug: {
                        description: 'A valid slug for an event',
                        type: 'string',
                    },
                },
                ['slug']
            ),
            response: {
                [status.OK]: fastify.responseObject(
                    status.OK,
                    fastify.refs.Event
                ),
            },
            errorResponses: [status.NOT_FOUND],
        },
    })
}
