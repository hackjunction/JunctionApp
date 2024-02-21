const express = require('express')
const asyncHandler = require('express-async-handler')
const FileController = require('./controller.js')

const router = express.Router()


const uploadFile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const upload = await FileController.uploadOne(req.body.caption, req.file)
    return res.status(200).json(upload)
})

const getFileByName = asyncHandler(async (req, res) => {
    console.log(req.body)
    const response = await FileController.findImageByName(req.params.filename)
    return response
})

const deleteFileById = asyncHandler(async (req, res) => {
    console.log(req.body)
    const response = await FileController.deleteFileById(req.params.id)
    return res.status(200).json({
        success: true,
        message: `File with ID: ${req.params.id} deleted`,
    })
})


router
    .route('/')
    .post(
        uploadFile
    )

router
    .route('/:filename')
    .get(
        getFileByName
    )

router
    .route('/:id')
    .delete(
        deleteFileById
    )



module.exports = router