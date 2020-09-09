import _axios from 'services/axios'

const RegistrationsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/registrations'

/** Get all of your registrations as the logged in user
 * GET /
 */
RegistrationsService.getUserRegistrations = idToken => {
    return _axios.get(`${BASE_ROUTE}`, config(idToken))
}

/** Get your registration for an event as the logged in user
 * GET /:slug
 */
RegistrationsService.getRegistration = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}`, config(idToken))
}

/** Create a registration for an event as the logged in user
 * POST /:slug
 */
RegistrationsService.createRegistration = (idToken, slug, data) => {
    return _axios.post(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

/** Update a registration for an event as the logged in user
 * PATCH /:slug
 */
RegistrationsService.updateRegistration = (idToken, slug, data) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

/** Confirm participation for an event as the logged in user
 * PATCH /:slug/confirm
 */
RegistrationsService.confirmRegistration = (idToken, slug) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/confirm`, {}, config(idToken))
}

/** Cancel participation for an event as the logged in user
 * PATCH /:slug/cancel
 */
RegistrationsService.cancelRegistration = (idToken, slug) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/cancel`, {}, config(idToken))
}

/** Get all registrations for event
 * GET /:slug/all
 */
RegistrationsService.getRegistrationsForEvent = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/all`, config(idToken))
}

/** Edit registrations in bulk
 * PATCH /:slug/bulk
 */
RegistrationsService.bulkEditRegistrationsForEvent = (
    idToken,
    slug,
    userIds,
    edits,
) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/bulk`,
        { userIds, edits },
        config(idToken),
    )
}

/** Assign travel grant amounts in bulk
 * PATCH /:slug/bulk/grants
 */
RegistrationsService.bulkAssignTravelGrantsForEvent = (
    idToken,
    slug,
    grants,
) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/bulk/grants`,
        { grants },
        config(idToken),
    )
}

RegistrationsService.bulkRejectTravelGrantsForEvent = (idToken, slug) => {
    return _axios.delete(`${BASE_ROUTE}/${slug}/bulk/grants`, config(idToken))
}

/** Accept all soft-accepted registrations
 * PATCH /:slug/bulk/accept
 */
RegistrationsService.bulkAcceptRegistrationsForEvent = (idToken, slug) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/bulk/accept`,
        {},
        config(idToken),
    )
}

/** Reject all soft-rejected registrations
 * PATCH /:slug/bulk/reject
 */
RegistrationsService.bulkRejectRegistrationsForEvent = (idToken, slug) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/bulk/reject`,
        {},
        config(idToken),
    )
}

/** Assign 10 registrations to logged in user
 * GET /:slug/assign
 */
RegistrationsService.assignRandomRegistrations = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/assign`, config(idToken))
}

/** Get a single registration with all fields
 * GET /:slug/:registrationId
 */
RegistrationsService.getFullRegistration = (idToken, slug, registrationId) => {
    return _axios.get(
        `${BASE_ROUTE}/${slug}/${registrationId}`,
        config(idToken),
    )
}

/** Get a user's registration to a given event by userId
 * GET /:slug/user/:userId
 */
RegistrationsService.getRegistrationByUserId = (idToken, slug, userId) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/user/${userId}`, config(idToken))
}

/** Edit a single registration
 * PATCH /:slug/:registrationId
 */
RegistrationsService.editRegistration = (
    idToken,
    slug,
    registrationId,
    data,
) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/${registrationId}`,
        data,
        config(idToken),
    )
}

RegistrationsService.updateTravelGrantDetails = (idToken, slug, data) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/travel-grant-details`,
        { data },
        config(idToken),
    )
}

RegistrationsService.adminUpdateTravelGrantDetails = (
    idToken,
    slug,
    registrationId,
    data,
) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/admin/travel-grant-details`,
        { registrationId, data },
        config(idToken),
    )
}

RegistrationsService.adminNotifyRejectedTravelGrants = (idToken, slug) => {
    return _axios.post(
        `${BASE_ROUTE}/${slug}/admin/travel-grant-details/notify-rejected`,
        {},
        config(idToken),
    )
}

RegistrationsService.adminNotifyAcceptedTravelGrants = (idToken, slug) => {
    return _axios.post(
        `${BASE_ROUTE}/${slug}/admin/travel-grant-details/notify-accepted`,
        {},
        config(idToken),
    )
}

export default RegistrationsService
