const errorProperties = {
    status: {
        description: 'The HTTP status code of the response',
        type: 'number',
    },
    code: {
        description: 'The internal code of the error, e.g. ERR_NOT_FOUND',
        type: 'string',
    },
    name: {
        description: 'The name of the error',
        type: 'string',
    },
    message: {
        description: 'The error message',
        type: 'string',
    },
    details: {
        description: 'Further details on the error, if available',
        type: 'string',
    },
}

module.exports = Object.freeze({
    200: {
        description: 'Success',
        type: 'null',
    },
    201: {
        description: 'Success (Created)',
        type: 'null',
    },
    400: {
        description: 'Bad request',
        type: 'object',
        properties: errorProperties,
    },
    401: {
        description: 'Unauthorized',
        type: 'object',
        properties: errorProperties,
    },
    403: {
        description: 'Forbidden',
        type: 'object',
        properties: errorProperties,
    },
    404: {
        description: 'Not Found',
        type: 'object',
        properties: errorProperties,
    },
})
