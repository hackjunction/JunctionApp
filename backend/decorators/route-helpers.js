const status = require('http-status')
const assert = require('assert')
const { JsonSchemas } = require('@hackjunction/shared')

/** Register some useful helpers for building route definitions */

module.exports = async fastify => {
    /** Register JSON schemas */
    const schemas = {}
    const refs = {}
    Object.keys(JsonSchemas).forEach(key => {
        const schema = JsonSchemas[key]
        if (schema.$id) {
            fastify.addSchema(JsonSchemas[key])
            schemas[key] = JsonSchemas[key]
            refs[key] = `${JsonSchemas[key].$id}#`
        }
    })
    /** Add decorators for easy access */
    fastify.decorate('schemas', schemas)
    fastify.decorate('refs', refs)

    /** Decorate fastify with the different API response schemas */
    fastify.decorate('responses', JsonSchemas.ApiResponses)

    /** Request schema builder shorthand functions */
    function requestParams(properties, required) {
        return {
            type: 'object',
            properties,
            required,
        }
    }
    fastify.decorate('requestParams', requestParams)

    /** Response schema builder shorthand functions */
    function responseObject(statusCode, schemaOrProperties) {
        const data =
            typeof schemaOrProperties === 'string'
                ? schemaOrProperties
                : {
                      type: 'object',
                      properties: schemaOrProperties,
                  }
        return {
            ...this.responses[statusCode],
            type: 'object',
            properties: {
                data,
            },
        }
    }

    function responseArray(statusCode, schemaOrProperties) {
        return {
            ...this.responses[statusCode],
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: schemaOrProperties,
                },
            },
        }
    }

    function responseEmpty(statusCode) {
        return {
            ...this.responses[statusCode],
        }
    }

    fastify.decorate('responseObject', responseObject)
    fastify.decorate('responseArray', responseArray)
    fastify.decorate('responseEmpty', responseEmpty)

    /** Helper function for adding authentication to a route in a DRY way */
    function authenticatedRoute(permissions = [], routeConfig) {
        assert.notEqual(typeof routeConfig, 'undefined')
        const preValidation = routeConfig.preValidation || []
        const schema = routeConfig.schema || {}
        const response = schema.response || {}
        const security = schema.security || []

        this.route({
            ...routeConfig,
            /** Add the auth & permissions checks here before other preValidation */
            preValidation: [
                this.authenticate,
                this.hasPermissions(permissions),
                ...preValidation,
            ],
            schema: {
                ...schema,
                response: {
                    /** Add the default 401 response definition here */
                    [status.UNAUTHORIZED]: {
                        ...this.responses[status.UNAUTHORIZED],
                    },
                    ...response,
                },
                security: [
                    /** Add the corresponding security definition here */
                    {
                        bearerToken: permissions,
                    },
                    ...security,
                ],
            },
        })
    }
    fastify.decorate('authenticatedRoute', authenticatedRoute)
}
