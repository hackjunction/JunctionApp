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
    constructor(message, details) {
        const name = 'NotFoundError'
        const code = 1
        super(message, name, code, details)
    }
}

class InsufficientPrivilegesError extends CustomError {
    constructor(message, details) {
        const name = 'InsufficientPrivilegesError'
        const code = 2
        super(message, name, code, details)
    }
}

class EmailVerificationError extends CustomError {
    constructor(message, details) {
        const name = 'EmailVerificationError'
        const code = 3
        super(message, name, code, details)
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
    constructor(message, details) {
        const name = 'ForbiddenError'
        const code = 5
        super(message, name, code, details)
    }
}

class UnauthorizedError extends CustomError {
    constructor(message, details) {
        const name = 'UnauthorizedError'
        const code = 6
        super(message, name, code, details)
    }
}

class AlreadyExistsError extends CustomError {
    constructor(message, details) {
        const name = 'AlreadyExistsError'
        const code = 7
        super(message, name, code, details)
    }
}

class MongoError extends CustomError {
    constructor(message, details) {
        const name = 'MongoError'
        const code = 8
        super(message, name, code, details)
    }
}

module.exports = {
    InsufficientPrivilegesError,
    EmailVerificationError,
    NotFoundError,
    ValidationError,
    ForbiddenError,
    UnauthorizedError,
    AlreadyExistsError,
    MongoError,
}
