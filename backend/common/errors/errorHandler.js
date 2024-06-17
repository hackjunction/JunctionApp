const logger = require('../../misc/logger')

const logError = (error, request) => {
    logger.error({
        message: error.message,
        error: {
            stack: error.stack,
            complete: error,
        },
        request: {
            requestBody: request.body,
            requestParams: request.params,
            requestQuery: request.query,
        },
    })
}

const errorHandler = (error, request, response, next) => {
    logError(error, request)
    switch (error.name) {
        case 'UnauthorizedError': {
            return response.status(401).json({
                message: error.message || 'Unauthorized',
                status: 401,
            })
        }
        case 'NotFoundError': {
            return response.status(404).json({
                message: error.message || 'Not found',
                status: 404,
            })
        }
        case 'InsufficientPrivilegesError': {
            return response.status(401).json({
                message: error.message || 'Insufficient privileges',
                status: 401,
            })
        }
        case 'EmailVerificationError': {
            return response.status(403).json({
                message: error.message || 'Email verification required',
                status: 403,
            })
        }
        case 'ValidationError': {
            return response.status(400).json({
                message: error.message || 'Validation error',
                errors: error.errors,
                status: 400,
            })
        }
        case 'ForbiddenError': {
            return response.status(403).json({
                message: error.message || 'Forbidden',
                status: 403,
            })
        }
        case 'AlreadyExistsError': {
            return response.status(400).json({
                message: error.message || 'Already exists',
                status: 400,
            })
        }
        case 'MongoError': {
            if (error.code === 11000) {
                return response.status(400).json({
                    message: 'Report to tech support',
                    type: 'unique-violation',
                    status: 400,
                })
            }
            return response.status(400).json({
                message: error.message || 'Validation error',
                status: 400,
            })
        }
        default:
            return response.status(500).json({
                message: error.message || 'Unexpected error',
                status: 500,
            })
    }
}

module.exports = errorHandler
