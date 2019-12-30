const { Auth } = require('@hackjunction/shared')
const status = require('http-status')
const { JsonSchemas } = require('@hackjunction/shared')
const EventController = require('../controller')

module.exports = async (fastify, options) => {
    fastify.route({
        method: 'GET',
        url: '/',
        preValidation: [
            fastify.authenticate,
            fastify.hasPermissions([Auth.Permissions.MANAGE_EVENT]),
        ],
        schema: {
            summary: 'Get own events',
            description: 'Get all events which you are organising',
            tags: ['Events'],
            response: {
                200: {
                    description: 'Returns an array of events',
                    type: 'array',
                    items: {
                        $ref: JsonSchemas.Event.$id,
                    },
                },
                401: {
                    description: 'Unauthorized',
                    type: 'object',
                    properties: {
                        reason: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const events = await EventController.getEventsByOrganiser(
                request.user
            )
            return reply.code(status.OK).send(events)
        },
    })

    fastify.route({
        method: 'POST',
        url: '/',
        preValidation: [
            fastify.authenticate,
            fastify.hasPermissions([Auth.Permissions.MANAGE_EVENT]),
        ],
        schema: {
            summary: 'Create a new event',
            description:
                'Creates a new event, with the current user as the owner',
            tags: ['Events'],
            body: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        minLength: 3,
                        maxLength: 100,
                    },
                },
                required: ['name'],
            },
            response: {
                201: {
                    description: 'Event created successfully',
                    type: 'object',
                    properties: {
                        ...JsonSchemas.Event.properties,
                    },
                },
            },
        },
        handler: async (request, reply) => {
            const event = await EventController.createEvent(
                request.body,
                request.user
            )
            return reply.code(status.CREATED).send(event)
        },
    })
    // fastify.route({
    //     method: 'POST',
    //     url: '/',
    //     schema: {
    //         body: {
    //             type: 'object',
    //             required: ['to', 'params'],
    //             properties: {
    //                 to: {
    //                     type: 'string',
    //                     description: 'The email address to send the preview to',
    //                     format: 'email',
    //                 },
    //                 params: {
    //                     $ref: JsonSchemas.EmailParameters.$id,
    //                 },
    //             },
    //         },
    //         response: {
    //             [status.OK]: {
    //                 type: 'object',
    //                 properties: {
    //                     status: {
    //                         type: 'string',
    //                         enum: ['success', 'error'],
    //                     },
    //                     message: {
    //                         type: 'string',
    //                         description: 'A description of the error',
    //                     },
    //                 },
    //             },
    //         },
    //     },
    //     handler: async (request, reply) => {
    //         const { to, params } = request.body
    //         await EmailTaskController.sendPreviewEmail(to, params)
    //         reply.send({ message: 'success' })
    //     },
    // })
}
