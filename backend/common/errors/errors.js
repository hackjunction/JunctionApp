const status = require('http-status')

class CustomError extends Error {
    constructor(message, name, code, httpStatus, details = {}) {
        super(message)
        this.name = name
        this.message = message
        this.code = code
        this.httpStatus = httpStatus
        this.details = details
    }

    toJSON() {
        return {
            status: this.httpStatus,
            code: this.code,
            name: this.name,
            message: this.message,
            details: this.details,
        }
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        const name = 'NotFoundError'
        const code = 'ERR_NOT_FOUND'
        const httpStatus = status.NOT_FOUND
        super(message, name, code)
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        const name = 'UnauthorizedError'
        const code = 'ERR_UNAUTHORIZED'
        const httpStatus = status.UNAUTHORIZED
        super(message, name, code)
    }
}

class ValidationError extends CustomError {
    constructor(message, details) {
        const name = 'ValidationError'
        const code = 'ERR_VALIDATION_FAILED'
        const httpStatus = status.BAD_REQUEST
        super(message, name, code, details)
    }
}

class ForbiddenError extends CustomError {
    constructor(message) {
        const name = 'ForbiddenError'
        const code = 'ERR_FORBIDDEN'
        const httpStatus = status.FORBIDDEN
        super(message, name, code)
    }
}

module.exports = {
    NotFoundError,
    ValidationError,
    ForbiddenError,
    UnauthorizedError,
}
