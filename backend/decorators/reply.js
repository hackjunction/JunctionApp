const fp = require('fastify-plugin')

module.exports = fp(async fastify => {
    /** Simple function to wrap the response in a data object */
    fastify.decorateReply('sendData', function(payload) {
        this.send({
            data: payload,
        })
    })
})
