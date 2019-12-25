const pino = require('pino')

// const opts =
//     process.env.NODE_ENV === 'production'
//         ? {}
//         : {
//               prettyPrint: { colorize: true },
//               redact: ['res.headers', 'req.headers'],
//           }

const opts = {
    // prettyPrint: { colorize: true },
    redact: ['res.headers', 'req.headers.authorization'],
}

/** Send production logs to Sentry, use console in development */
const stream = pino.destination(1)
const logger = pino(opts, stream)

module.exports = logger
