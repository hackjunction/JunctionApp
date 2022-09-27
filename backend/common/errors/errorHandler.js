const logger = require('../../misc/logger')

const errorHandler = (error, request, response, next) => {
    switch (error.name) {
        case 'UnauthorizedError': {
            return response.status(401).json({
                message: error.message || 'Unauthorized',
                status: 401,
            })
        }
        case 'InsufficientPrivilegesError': {
            return response.status(401).json({
                message: 'Insufficient privileges',
                status: 401,
            })
        }
        case 'ForbiddenError': {
            return response.status(403).json({
                message: error.message || 'Forbidden',
                status: 403,
            })
        }
        case 'NotFoundError': {
            return response.status(404).json({
                message: error.message || 'Not found',
                status: 404,
            })
        }
        case 'ValidationError': {
            return response.status(400).json({
                message: error.message,
                errors: error.errors,
                status: 400,
            })
        }
        case 'MongoError': {
            if (error.code === 11000) {
                return response.status(400).json({
                    type: 'unique-violation',
                    status: 400,
                })
            }
            break
        }
        default:
            logger.error({
                message: 'Unhandled error',
                error: {
                    message: error.message,
                    stack: error.stack,
                },
            })

            return response.status(500).json({
                message: 'Unexpected error',
                status: 500,
            })
    }
}

module.exports = errorHandler
