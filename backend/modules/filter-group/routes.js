const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')

const { Auth } = require('@hackjunction/shared')

const FilterGroupController = require('./controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')
const { isEventOrganiser } = require('../../common/middleware/events')

const createFilterGroup = asyncHandler(async (req, res) => {
    const { label, description, filters } = req.body
    const { sub } = req.user
    const { _id } = req.event

    const filterGroup = await FilterGroupController.createFilterGroup(
        label,
        description,
        sub,
        _id.toString(),
        filters
    )

    return res.status(200).json(filterGroup)
})

const editFilterGroup = asyncHandler(async (req, res) => {
    const { label, description, filters } = req.body
    const { sub } = req.user
    const { _id } = req.event

    const filterGroup = await FilterGroupController.editFilterGroup(
        label,
        description,
        sub,
        _id.toString(),
        filters
    )
    return res.status(200).json(filterGroup)
})

const deleteFilterGroup = asyncHandler(async (req, res) => {
    const { label } = req.body
    const { _id } = req.event

    const filterGroup = await FilterGroupController.deleteFilterGroup(
        label,
        _id.toString()
    )

    return res.status(200).json(filterGroup)
})

const getFilterGroupsForEvent = asyncHandler(async (req, res) => {
    const { _id } = req.event

    const filterGroups = await FilterGroupController.getFilterGroupsForEvent(
        _id.toString()
    )

    return res.status(200).json(filterGroups)
})

router
    .route('/:slug')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        getFilterGroupsForEvent
    )
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        createFilterGroup
    )
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        editFilterGroup
    )
    .delete(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        deleteFilterGroup
    )

module.exports = router
