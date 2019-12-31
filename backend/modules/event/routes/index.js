module.exports = async (fastify, options) => {
    /** Get all public events */
    fastify.register(require('./root'))

    fastify.register(require('./public'), {
        prefix: '/public',
    })
}

// const express = require('express')
// // const { celebrate, Joi } = require('celebrate')
// // const status = require('http-status')

// const router = express.Router()
// const swagger = require('swagger-spec-express')

// swagger.swaggerize(router)

// // const asyncHandler = require('express-async-handler')
// // const { validate } = require('express-jsonschema')
// // const { Auth, JsonSchemas } = require('@hackjunction/shared')

// // const { hasToken } = require('../../common/middleware/token')
// // const { hasPermission } = require('../../common/middleware/permissions')
// // const { isEventOrganiser } = require('../../common/middleware/events')
// // const EmailTaskController = require('./controller')

// require('./:slug/preview.js')(router, '/:slug/preview')
// require('./:slug/send.js')(router.route('/:slug/send'))

// module.exports = router
