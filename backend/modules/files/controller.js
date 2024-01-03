const { AlreadyExistsError, NotFoundError } = require("../../common/errors/errors")
const mongoose = require('mongoose')
const File = require('./model')


const controller = {}

// initialize stream
let gfs = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
})

controller.updateMetadata = async (userId, updates) => {
    // const user = await auth0.getUser({ id: userId })
    // const metadata = { ...user.user_metadata, ...updates }
    // const updatedUser = await auth0.updateUserMetadata({ id: userId }, metadata)
    return "updatedUser"
}

controller.uploadOne = async (caption, file) => {
    File.findOne({
        caption: caption
    })
        .then((file) => {
            console.log("file", file)
            if (file) {
                return new AlreadyExistsError(
                    `File ${file} already exist`
                )
            }

            let newFile = new File({
                caption: caption,
                filename: file.filename,
                fileId: file.id,
            })

            newFile.save()
        })

}

controller.findImageByName = async (filename) => {
    gfs.find({ filename: filename }).toArray((err, files) => {
        if (!files[0] || files.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No files found',
            })
        }

        return res.status(200).json({
            success: true,
            file: files[0],
        })
    })

}

controller.deleteFileById = async (id) => {
    File.findOne({ _id: id })
        .then((file) => {
            if (file) {
                return File.deleteOne({ _id: id })
            }
            else {
                return new NotFoundError(
                    `File with ID ${id} not found`
                )
            }
        }
    }


module.exports = controller