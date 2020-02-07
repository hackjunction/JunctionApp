class CustomError extends Error {
    constructor(message, name, code, details = {}) {
        super(message)
        this.name = name
        this.message = message
        this.code = code
        this.details = details
    }

    toJSON() {
        return {
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
        const code = 1
        super(message, name, code)
    }
}

class InsufficientPrivilegesError extends CustomError {
    constructor(message) {
        const name = 'InsufficientPrivilegesError'
        const code = 2
        super(message, name, code)
    }
}

class EmailVerificationError extends CustomError {
    constructor(message) {
        const name = 'EmailVerificationError'
        const code = 3
        super(message, name, code)
    }
}

class ValidationError extends CustomError {
    constructor(message, details) {
        const name = 'ValidationError'
        const code = 4
        super(message, name, code, details)
    }
}

class ForbiddenError extends CustomError {
    constructor(message) {
        const name = 'ForbiddenError'
        const code = 5
        super(message, name, code)
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        const name = 'UnauthorizedError'
        const code = 6
        super(message, name, code)
    }
}

module.exports = {
    InsufficientPrivilegesError,
    EmailVerificationError,
    NotFoundError,
    ValidationError,
    ForbiddenError,
    UnauthorizedError,
}
