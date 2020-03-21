const { NotFoundError } = require('../errors/errors')

const AdminMiddleware = {
    hasAdminToken: (req, res, next) => {
        console.log('CHECKING ADMIN TOKEN', req.query.adminToken)
        if (req.query.adminToken === global.gConfig.ADMIN_TOKEN) {
            next()
        } else {
            next(new NotFoundError())
        }
    },
}

module.exports = AdminMiddleware
