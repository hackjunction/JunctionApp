const express = require('express')

const router = express.Router()
const { Auth } = require('@hackjunction/shared')
const helper = require('./helper')

const { hasPermission } = require('../../common/middleware/permissions')
const { hasToken } = require('../../common/middleware/token')
const { ForbiddenError } = require('../../common/errors/errors')

const {
    isEventOrganiser,
    canSubmitProject,
    hasRegisteredToEvent,
} = require('../../common/middleware/events')

/**
 * Upload a new avatar for a user
 */
router.post('/users/avatar', hasToken, (req, res, next) => {
    helper.uploadUserAvatar(req.user.sub)(req, res, function(err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                next(new ForbiddenError(err.message))
            } else {
                next(err)
            }
        } else {
            res.status(200).json({
                url: req.file.secure_url || req.file.url,
                publicId: req.file.publicId,
            })
        }
    })
})

/**
 * Upload a cover image for an event
 */
router.post(
    '/events/:slug/cover-image',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    (req, res, next) => {
        helper.uploadEventCoverImage(req.event.slug)(req, res, function(err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    next(new ForbiddenError(err.message))
                } else {
                    next(err)
                }
            } else {
                res.status(200).json({
                    url: req.file.secure_url || req.file.url,
                    publicId: req.file.public_id,
                })
            }
        })
    }
)

/**
 * Upload a logo for an event
 */
router.post(
    '/events/:slug/logo',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    (req, res, next) => {
        helper.uploadEventLogo(req.event.slug)(req, res, function(err) {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    next(new ForbiddenError(err.message))
                } else {
                    next(err)
                }
            } else {
                res.status(200).json({
                    url: req.file.secure_url || req.file.url,
                    publicId: req.file.public_id,
                })
            }
        })
    }
)

/**
 * Upload a travel reimbursement document for an event
 */
router.post(
    '/:slug/travel-grant-receipts',
    hasToken,
    hasRegisteredToEvent,
    (req, res, next) => {
        helper.uploadTravelGrantReceipt(req.event.slug, req.user.sub)(
            req,
            res,
            function(err) {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        next(new ForbiddenError(err.message))
                    } else {
                        next(err)
                    }
                } else {
                    res.status(200).json({
                        url: req.file.secure_url || req.file.url,
                        publicId: req.file.public_id,
                    })
                }
            }
        )
    }
)

/**
 * Upload images for a project
 */
router.post(
    '/events/:slug/projects',
    hasToken,
    canSubmitProject,
    // TODO: Is participant in project,
    (req, res, next) => {
        helper.uploadProjectImage(req.event.slug, req.team.code)(
            req,
            res,
            function(err) {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        next(new ForbiddenError(err.message))
                    } else {
                        next(err)
                    }
                } else {
                    res.status(200).json({
                        url: req.file.secure_url || req.file.url,
                        publicId: req.file.public_id,
                    })
                }
            }
        )
    }
)

/**
 * Upload icon for a hackerpack partner
 */
// TODO isSuperAdmin
router.post('/hackerpack/icon', hasToken, (req, res, next) => {
    console.log('Happanun', req)
    helper.uploadHackerpackIcon(req.hackerpack.id)(req, res, function(err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                next(new ForbiddenError(err.message))
            } else {
                next(err)
            }
        } else {
            res.status(200).json({
                url: req.file.secure_url || req.file.url,
                publicId: req.file.public_id,
            })
        }
    })
})

module.exports = router
