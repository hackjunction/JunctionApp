const mongoose = require('mongoose')
const Promise = require('bluebird')

const logger = require('./logger')

mongoose.Promise = Promise

const connect = () => {
    mongoose.set('debug', process.env.NODE_ENV === 'development')
    mongoose.connect(global.gConfig.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection
    db.on('error', err => {
        logger.error({
            message: 'Mongoose connection error',
            error: {
                message: err.message,
                stack: err.stack,
            },
        })
    })
    db.once('open', () => {
        logger.info({
            message: `Mongoose connected to ${global.gConfig.MONGODB_URI}`,
        })
    })
}

module.exports = {
    connect,
}
