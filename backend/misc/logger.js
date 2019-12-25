const pino = require('pino')

const prod = process.env.NODE_ENV === 'production'

const opts = {
    prettyPrint: prod ? undefined : { colorize: true },
    redact: ['res.headers', 'req.headers.authorization'],
}

/** Send production logs to Sentry, use console in development */
const stream = pino.destination(1)
const logger = pino(opts, stream)

module.exports = logger
