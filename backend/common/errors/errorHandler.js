const status = require('http-status')
const { ValidationError } = require('./errors')

module.exports = async (error, request, reply) => { //eslint-disable-line
    /** Check if the error is s subclass of CustomError (purposefully thrown) */
    if (error.httpStatus) {
        return reply.code(error.httpStatus).send(error.toJSON())
    }

    /** Check if the error is a fastify validation error */
    console.log('ERROR', error.validation)
    if (Array.isArray(error.validation) && error.validation.length > 0) {
        return reply.code(status.BAD_REQUEST).send({
            message: 'Validation failed',
            status: status.BAD_REQUEST,
            details: error.validation,
        })
    }

    /** Check if the error is one of the known types */
    switch (error.name) {
        case 'MongoError': {
            if (error.code === 11000) {
                const err = new ValidationError('Unique validation')
                return reply.code(err.httpStatus).send(error.toJSON())
            }
            break
        }
        default: {
            request.log.error({
                message: 'Unhandled error',
                error: {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                },
            })

            return reply.code(status.INTERNAL_SERVER_ERROR).send({
                message: 'Unexpected error',
                status: 500,
            })
        }
    }
}
