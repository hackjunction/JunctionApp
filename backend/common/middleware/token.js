const { UnauthorizedError } = require('../errors/errors')

/** Token parsing logic has moved to misc/jwt.js and is run for every request.
 * The purpose of this middleware is to throw a 401 error if the JWT does not exist
 * or is invalid
 */

/* Verify JWT from client requests */

module.exports = {
    hasToken: (req, res, next) => {
        if (!req.user) {
            throw new UnauthorizedError('Authentication required')
        } else {
            next()
        }
    },
}
