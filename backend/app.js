const express = require('express')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const path = require('path')
const helmet = require('helmet')
const sslRedirect = require('heroku-ssl-redirect')

/** Create Express application */
const app = express()

/* Prepare config */
require('./misc/config')

// Enable route logging by uncommenting this line
/** Use helmet for some basic security measures */
app.use(helmet())

/* Prerender */
app.use(
    require('prerender-node').set(
        'prerenderToken',
        process.env.PRERENDER_TOKEN,
    ),
)

/* Force SSL Redirect in production */
app.use(sslRedirect(['production'], 301))

/* Enable body-parser */
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

/* JWT-middleware from all requests */
const { verifyToken, parseToken } = require('./misc/jwt')

app.use(verifyToken)
app.use(parseToken)

/* Register API routes */
require('./modules/routes')(app)

/* Register GraphQL server */
require('./modules/graphql')(app)

/* Serve frontend at all other routes */
if (process.env.NODE_ENV === 'production') {
    const root = path.join(__dirname, 'build')
    app.use(express.static(root))
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root })
    })
}

/* Handle Joi validation errors */
app.use(errors())

/* Global error handler */
app.use(require('./common/errors/errorHandler'))

require('./misc/db').connect()

module.exports = app
