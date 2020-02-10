const { NotFoundError } = require('../errors/errors')

const AdminMiddleware = {
    hasAdminToken: (req, res, next) => {
        if (req.query.token === global.gConfig.ADMIN_TOKEN) {
            next()
        } else {
            next(new NotFoundError())
        }
    },
}

module.exports = AdminMiddleware
