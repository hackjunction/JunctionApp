const mongoose = require('mongoose')
const Promise = require('bluebird')

const logger = require('./logger')

mongoose.Promise = Promise

//let gfs

const connect = () => {
    logger.info('Establishing database connection...')
    return new Promise((resolve, reject) => {
        // mongoose.set('debug', true)
        mongoose.connect(global.gConfig.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })


        mongoose.connection.on('error', err => {
            logger.error({
                message: 'Mongoose connection error',
                error: {
                    message: err.message,
                    stack: err.stack,
                },
            })
            reject(new Error('Connection to database failed'))
        })


        mongoose.connection.on("connected", () => {
            // var db = mongoose.connections[0].db
            // gfs = new mongoose.mongo.GridFSBucket(db, {
            //     bucketName: "uploads"
            // })
            // logger.info(`Mongoose GridFSBucket connected to ${gfs}`)
            logger.info(`Mongoose connected to ${global.gConfig.MONGODB_URI}`)
            resolve()

        })


    })
}

// const gfs = () => {
//     var client = mongoose.connections[0].client
//     var db = mongoose.connections[0].db
//     const gfs = new mongoose.mongo.GridFSBucket(db, {
//         bucketName: "uploads"
//     })
//     logger.info(`Mongoose GridFSBucket connected to ${gfs}`)
//     return gfs
// }

module.exports = {
    connect,
    //gfs
}
