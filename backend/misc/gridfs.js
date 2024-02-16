const { resolve } = require('bluebird')
const { reject } = require('lodash')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
var crypto = require('crypto')

mongoose.Promise = Promise

//create storrage engine
const storage = new GridFsStorage({
    url: global.gConfig.MONGODB_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            //encrypt filename
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

const upload = multer({ storage })

module.exports = {
    storage,
    upload,
}