const mongoose = require('mongoose')
const Promise = require('bluebird')

const logger = require('./logger')

mongoose.Promise = Promise

const connect = () => {
    logger.info('Establishing database connection...')
    return new Promise((resolve, reject) => {
        // mongoose.set('debug', true)
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
            reject(new Error('Connection to database failed'))
        })
        db.once('open', () => {
            logger.info(`Mongoose connected to ${global.gConfig.MONGODB_URI}`)
            resolve()
        })
    })
}

module.exports = {
    connect,
}
