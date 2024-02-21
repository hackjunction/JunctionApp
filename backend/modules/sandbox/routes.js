const express = require('express')
const asyncHandler = require('express-async-handler')

const AuthController = require('../auth/controller')

const router = express.Router()

const updateMetadata = asyncHandler(async (req, res) => {
    const userId = req.body.userId
    const data = req.body.data
    console.log(userId, data, body)
    //const update = await AuthController.updateMetadata(userId, data)
    return res.status(200).json("update")
})



// router
//     .route('/metadata')
//     .patch(
//         updateMetadata,
//     )



module.exports = router
