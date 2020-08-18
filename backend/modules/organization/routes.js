const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const OrganizationController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasRole } = require('../../common/middleware/permissions')

const getOrganizations = asyncHandler(async (req, res) => {
    const Organization = await OrganizationController.getOrganizations()
    return res.status(200).json(Organization)
})

const getOrganization = asyncHandler(async (req, res) => {
    const Organization = await OrganizationController.getOrganizationBySlug(
        req.params.slug
    )
    return res.status(200).json(Organization)
})

const deleteOrganization = asyncHandler(async (req, res) => {
    const Organization = await OrganizationController.deleteOrganization(
        req.params.slug
    )
    return res.status(200).json(Organization)
})

const createOrganization = asyncHandler(async (req, res) => {
    const organization = await OrganizationController.createOrganization(
        req.body
    )
    return res.status(201).json(organization)
})

const updateOrganization = asyncHandler(async (req, res) => {
    const updatedOrganization = await OrganizationController.updateOrganization(
        req.params.slug,
        req.body
    )
    return res.status(200).json(updatedOrganization)
})

router
    .route('/')
    .get(getOrganizations)
    .post(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), createOrganization)

router
    .route('/:slug')
    .get(getOrganization)
    .delete(hasToken, deleteOrganization)
    .patch(hasToken, hasRole(Auth.Roles.SUPER_ADMIN), updateOrganization)
/*
router.route('/event/:slug').get(getOrganizationByEvent)
*/
module.exports = router
