const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Auth } = require('@hackjunction/shared');
const RegistrationController = require('./controller');
const EventController = require('../event/controller');
const UserProfileController = require('../user-profile/controller');
const EmailTaskController = require('../email-task/controller');

const { hasToken } = require('../../common/middleware/token');
const { hasPermission } = require('../../common/middleware/permissions');
const { canRegisterToEvent, isEventOrganiser } = require('../../common/middleware/events');

const getUserRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.getUserRegistrations(req.user);
    return res.status(200).json(registrations);
});

const getRegistration = asyncHandler(async (req, res) => {
    const event = await EventController.getPublicEventBySlug(req.params.slug);
    const registration = await RegistrationController.getRegistration(req.user.sub, event._id.toString());
    return res.status(200).json(registration);
});

const createRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.createRegistration(req.user, req.event, req.body);
    return res.status(201).json(registration);
});

const updateRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.updateRegistration(req.user, req.event, req.body);
    return res.status(200).json(registration);
});

const editRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.editRegistration(
        req.params.registrationId,
        req.event,
        req.body,
        req.user
    );
    return res.status(200).json(registration);
});

const rateRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.rateRegistration(
        req.params.registrationId,
        req.event,
        req.user,
        req.body.rating
    );
    return res.status(200).json(registration);
});

const acceptRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.acceptRegistration(req.params.registrationId, req.event);
    const user = await UserProfileController.getUserProfile(registration.user);
    await EmailTaskController.sendAcceptanceEmail(req.event, user);
    return res.status(200).json(registration);
});

const rejectRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.rejectRegistration(req.params.registrationId, req.event);
    const user = await UserProfileController.getUserProfile(registration.user);
    await EmailTaskController.sendAcceptanceEmail(req.event, user);
    return res.status(200).json(registration);
});

const getRegistrationsForEvent = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.getRegistrationsForEvent(req.event._id.toString());
    return res.status(200).json(registrations);
});

const searchRegistrationsForEvent = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.searchRegistrationsForEvent(
        req.event._id.toString(),
        req.user.sub,
        req.query
    );
    return res.status(200).json(registrations);
});

const selfAssignRegistrationsForEvent = asyncHandler(async (req, res) => {
    const registrations = await RegistrationController.selfAssignRegistrationsForEvent(
        req.event._id.toString(),
        req.user.sub
    );

    return res.status(200).json(registrations);
});

const assignRegistrationForEvent = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.assignRegistrationForEvent(req.body);

    return res.status(200).json(registration);
});

const getFullRegistration = asyncHandler(async (req, res) => {
    const registration = await RegistrationController.getFullRegistration(
        req.event._id.toString(),
        req.params.registrationId
    );
    return res.status(200).json(registration);
});

const bulkEditRegistrations = asyncHandler(async (req, res) => {
    await RegistrationController.bulkEditRegistrations(
        req.event._id.toString(),
        req.body.registrationIds,
        req.body.edits
    );
    return res.status(200).json([]);
});

router.route('/').get(hasToken, getUserRegistrations);

/** Get, create or update a registration */
router
    .route('/:slug')
    .get(hasToken, getRegistration)
    .post(hasToken, canRegisterToEvent, createRegistration)
    .patch(hasToken, canRegisterToEvent, updateRegistration);

/** Get all registration as organiser */
router.get(
    '/:slug/all',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    getRegistrationsForEvent
);

/** Search registrations as organiser */
router.get(
    '/:slug/search',
    hasToken,
    hasPermission(Auth.Permissions.MANAGE_EVENT),
    isEventOrganiser,
    searchRegistrationsForEvent
);

router
    .route('/:slug/assign')
    .get(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, selfAssignRegistrationsForEvent)
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, assignRegistrationForEvent);

router
    .route('/:slug/bulk')
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, bulkEditRegistrations);

/** Get or edit single registration as an organiser */
router
    .route('/:slug/:registrationId')
    .get(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, getFullRegistration)
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, editRegistration);

/** Rate a single registration */
router
    .route('/:slug/:registrationId/rate')
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, rateRegistration);

router
    .route('/:slug/:registrationId/accept')
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, acceptRegistration);

router
    .route('/:slug/:registrationId/reject')
    .patch(hasToken, hasPermission(Auth.Permissions.MANAGE_EVENT), isEventOrganiser, rejectRegistration);

module.exports = router;
