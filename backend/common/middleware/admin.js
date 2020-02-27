const { NotFoundError } = require('../errors/errors')

const logger = require('../../misc/logger')

const AdminMiddleware = {
    hasAdminToken: (req, res, next) => {
        logger.info('CHECKING ADMIN TOKEN', req.query.adminToken)
        if (req.query.adminToken === global.gConfig.ADMIN_TOKEN) {
            next()
        } else {
            next(new NotFoundError())
        }
    },
}

module.exports = AdminMiddleware
