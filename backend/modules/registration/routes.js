const express = require('express')

const router = express.Router()
const asyncHandler = require('express-async-handler')
const { Auth } = require('@hackjunction/shared')
const RegistrationController = require('./controller')
const EventController = require('../event/controller')
const UserProfileController = require('../user-profile/controller')

const { hasToken } = require('../../common/middleware/token')
const { hasPermission } = require('../../common/middleware/permissions')
const {
    canRegisterToEvent,
    hasRegisteredToEvent,
    isEventOrganiser,
} = require('../../common/middleware/events')

const getUserRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.getUserRegistrations(
        req.user,
    )
    return res.status(200).json(registrations)
})

const getRegistration = asyncHandler(async (req, res) => {
    const event = await EventController.getPublicEventBySlug(req.params.slug)
    const registration = await RegistrationController.getRegistration(
        req.user.sub,
        event._id.toString(),
    )
    return res.status(200).json(registration)
})

const createRegistration = asyncHandler(async (req, res) => {
    console.log('creating registration from routes')
    const registration = await RegistrationController.createRegistration(
        req.user,
        req.event,
        req.body,
    )
    console.log('registration complete')
    return res.status(201).json(registration)
})

const updateRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.updateRegistration(
        req.user,
        req.event,
        req.body,
    )
    /** Mirror the changes to the user's profile here */
    if (registration) {
        UserProfileController.updateUserProfile(
            registration.answers,
            req.user.sub,
        )
        return res.status(200).json(registration)
    }
    return res.status(500).json('Internal server error')
})

const finishRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.finishRegistration(
        req.user,
        req.event,
        req.body,
    )
    /** Mirror the changes to the user's profile here */
    if (registration) {
        UserProfileController.updateUserProfile(
            registration.answers,
            req.user.sub,
        )
        return res.status(200).json(registration)
    }
    return res.status(500).json('Internal server error')
})

const confirmRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.confirmRegistration(
        req.user,
        req.event,
    )
    return res.status(200).json(registration)
})

const cancelRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.cancelRegistration(
        req.user,
        req.event,
    )
    return res.status(200).json(registration)
})

const setTravelGrantDetails = asyncHandler(async (req, res) => {
    const registration =
        await RegistrationController.setTravelGrantDetailsForRegistration(
            req.user,
            req.event,
            req.body.data,
        )
    return res.status(200).json(registration)
})

const updateTravelGrantDetails = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.updateTravelGrantDetails(
        req.body.registrationId,
        req.event,
        req.body.data,
    )
    return res.status(200).json(registration)
})

const updateChecklist = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.updateChecklist(
        req.body.registrationId,
        req.body.data,
    )
    return res.status(200).json(registration)
})

const notifyTravelGrantDetailsRejected = asyncHandler(async (req, res) => {
    const count = await RegistrationController.notifyRejectedTravelGrants(
        req.event,
    )
    return res.status(200).json({ count })
})

const notifyTravelGrantDetailsAccepted = asyncHandler(async (req, res) => {
    const count = await RegistrationController.notifyAcceptedTravelGrants(
        req.event,
    )
    return res.status(200).json({ count })
})

const editRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.editRegistration(
        req.params.registrationId,
        req.event,
        req.body,
        req.user,
    )
    return res.status(200).json(registration)
})

const getRegistrationsForEvent = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.getRegistrationsForEvent(
        req.event._id.toString(),
    )
    return res.status(200).json(registrations)
})

const selfAssignRegistrationsForEvent = asyncHandler(async (req, res) => {
    const registrations =
        await RegistrationController.selfAssignRegistrationsForEvent(
            req.event._id.toString(),
            req.user.sub,
        )

    return res.status(200).json(registrations)
})

const assignRegistrationForEvent = asyncHandler(async (req, res) => {
    const registration =
        await RegistrationController.assignRegistrationForEvent(req.body)

    return res.status(200).json(registration)
})

const getFullRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.getFullRegistration(
        req.event._id.toString(),
        req.params.registrationId,
    )
    return res.status(200).json(registration)
})

const bulkEditRegistrations = asyncHandler(async (req, res) => {
    await RegistrationController.bulkEditRegistrations(
        req.event._id.toString(),
        req.body.userIds,
        req.body.edits,
        req.user,
    )
    return res.status(200).json([])
})

const bulkAssignTravelGrants = asyncHandler(async (req, res) => {
    await RegistrationController.bulkAssignTravelGrants(
        req.event._id.toString(),
        req.body.grants,
    )

    return res.status(200).json([])
})

const bulkRejectTravelGrants = asyncHandler(async (req, res) => {
    await RegistrationController.rejectPendingTravelGrants(
        req.event._id.toString(),
    )

    return res.status(200).json([])
})

const bulkAcceptRegistrations = asyncHandler(async (req, res) => {
    const eventId = req.event._id.toString()
    const accepted = await RegistrationController.acceptSoftAccepted(eventId)
    return res.status(200).json(accepted)
})

const bulkRejectRegistrations = asyncHandler(async (req, res) => {
    const eventId = req.event._id.toString()
    const rejected = await RegistrationController.rejectSoftRejected(eventId)
    return res.status(200).json(rejected)
})

const addPartnerToRegistrated = asyncHandler(async (req, res) => {
    console.log('addPartnerToRegistrated', req.body)
    //TODO: should check if the user is registered already first
    try {
        const hasRegistration = await RegistrationController.getRegistration(
            req.body.userId,
            req.event._id,
        )
        return res.status(200).json(hasRegistration)
    } catch (e) {
        console.log('hasRegistration', e)
        const registration =
            await RegistrationController.createPartnerRegistration(
                req.body.userId, //switch to actual user
                req.event, //slug
                req.body.profile /*data: {
                    firstName: 'seppo',
                    lastName: 'pykälä',
                    email: 'samu.rotko@gmail.com'
                  }*/,
            )
        return res.status(200).json(registration)
    }
})

const addGavelLoginToRegistrations = asyncHandler(async (req, res) => {
    console.log('Event id', req.event._id)
    console.log('From routes, for gavel login', req.body)
    await RegistrationController.addGavelLoginToRegistrations(
        req.event._id.toString(),
        req.body,
    )

    return res.status(200).json([])
})

router.route('/').get(hasToken, getUserRegistrations)

/** Get, create or update a registration */
router
    .route('/:slug')
    .get(hasToken, getRegistration)
    .post(hasToken, canRegisterToEvent, createRegistration)
    .patch(hasToken, canRegisterToEvent, updateRegistration)

router
    .route('/:slug/confirm')
    .post(hasToken, canRegisterToEvent, finishRegistration)
    .patch(hasToken, hasRegisteredToEvent, confirmRegistration)

router
    .route('/:slug/cancel')
    .patch(hasToken, hasRegisteredToEvent, cancelRegistration)

router
    .route('/:slug/travel-grant-details')
    .patch(hasToken, hasRegisteredToEvent, setTravelGrantDetails)

router
    .route('/:slug/checklist')
    .patch(hasToken, hasRegisteredToEvent, updateChecklist)

/** Get all registration as organiser */
router.get(
    '/:slug/all',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    getRegistrationsForEvent,
)

router
    .route('/:slug/assign')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        selfAssignRegistrationsForEvent,
    )
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        assignRegistrationForEvent,
    )

router
    .route('/:slug/bulk')
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        bulkEditRegistrations,
    )

router
    .route('/:slug/bulk/grants')
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        bulkAssignTravelGrants,
    )
    .delete(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        bulkRejectTravelGrants,
    )

router
    .route('/:slug/bulk/accept')
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        bulkAcceptRegistrations,
    )

router
    .route('/:slug/bulk/reject')
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        bulkRejectRegistrations,
    )

router
    .route('/:slug/admin/travel-grant-details/')
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        updateTravelGrantDetails,
    )

router
    .route('/:slug/admin/travel-grant-details/notify-rejected')
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        notifyTravelGrantDetailsRejected,
    )

router
    .route('/:slug/admin/travel-grant-details/notify-accepted')
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        notifyTravelGrantDetailsAccepted,
    )

/** Get or edit single registration as an organiser */
router
    .route('/:slug/:registrationId')
    .get(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        getFullRegistration,
    )
    .patch(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        editRegistration,
    )

router
    .route('/:slug/partner')
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        addPartnerToRegistrated,
    )

router
    .route('/:slug/gavel')
    .post(
        hasToken,
        hasPermission(Auth.Permissions.MANAGE_EVENT),
        isEventOrganiser,
        addGavelLoginToRegistrations,
    )

module.exports = router
