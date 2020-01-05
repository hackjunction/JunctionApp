import client from 'services/_client'

const RegistrationsService = {}

RegistrationsService.getUserRegistrations = idToken => {
    const url = `/api/registrations`
    return client.get(idToken)(url)
}

RegistrationsService.getRegistration = (idToken, slug) => {
    const url = `/api/registrations/${slug}`
    return client.get(idToken)(url)
}

RegistrationsService.createRegistration = (idToken, slug, data) => {
    const url = `/api/registrations/${slug}`
    return client.post(idToken)(url, data)
}

RegistrationsService.updateRegistration = (idToken, slug, data) => {
    const url = `/api/registrations/${slug}`
    return client.patch(idToken)(url, data)
}

RegistrationsService.confirmRegistration = (idToken, slug) => {
    const url = `/api/registrations/${slug}/confirm`
    return client.patch(idToken)(url)
}

RegistrationsService.cancelRegistration = (idToken, slug) => {
    const url = `/api/registrations/${slug}/cancel`
    return client.patch(idToken)(url)
}

RegistrationsService.getRegistrationsForEvent = (idToken, slug) => {
    const url = `/api/registrations/${slug}/all`
    return client.get(idToken)(url)
}
/** Assign 10 registrations to logged in user
 * GET /:slug/assign
 */
RegistrationsService.assignRandomRegistrations = (idToken, slug) => {
    const url = `/api/registrations/${slug}/assign/self`
    return client.patch(idToken)(url)
}

RegistrationsService.assignRegistrationToUser = (
    idToken,
    slug,
    userId,
    registrationId
) => {
    const url = `/api/registrations/${slug}/assign/${userId}/${registrationId}`
    return client.patch(idToken)(url)
}

/** Edit registrations in bulk
 * PATCH /:slug/bulk
 */
RegistrationsService.bulkEditRegistrationsForEvent = (
    idToken,
    slug,
    registrationIds,
    edits
) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/bulk`,
    //     { registrationIds, edits },
    //     config(idToken)
    // )
}

/** Assign travel grant amounts in bulk
 * PATCH /:slug/bulk/grants
 */
RegistrationsService.bulkAssignTravelGrantsForEvent = (
    idToken,
    slug,
    grants
) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/bulk/grants`,
    //     { grants },
    //     config(idToken)
    // )
}

RegistrationsService.bulkRejectTravelGrantsForEvent = (idToken, slug) => {
    // return _axios.delete(`${BASE_ROUTE}/${slug}/bulk/grants`, config(idToken))
}

/** Accept all soft-accepted registrations
 * PATCH /:slug/bulk/accept
 */
RegistrationsService.bulkAcceptRegistrationsForEvent = (idToken, slug) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/bulk/accept`,
    //     {},
    //     config(idToken)
    // )
}

/** Reject all soft-rejected registrations
 * PATCH /:slug/bulk/reject
 */
RegistrationsService.bulkRejectRegistrationsForEvent = (idToken, slug) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/bulk/reject`,
    //     {},
    //     config(idToken)
    // )
}

/** Assign 10 registrations to logged in user
 * GET /:slug/assign
 */
RegistrationsService.assignRandomRegistrations = (idToken, slug) => {
    // return _axios.get(`${BASE_ROUTE}/${slug}/assign`, config(idToken))
}

/** Get a single registration with all fields
 * GET /:slug/:registrationId
 */
RegistrationsService.getFullRegistration = (idToken, slug, registrationId) => {
    // return _axios.get(
    //     `${BASE_ROUTE}/${slug}/${registrationId}`,
    //     config(idToken)
    // )
}

/** Get a user's registration to a given event by userId
 * GET /:slug/user/:userId
 */
RegistrationsService.getRegistrationByUserId = (idToken, slug, userId) => {
    // return _axios.get(`${BASE_ROUTE}/${slug}/user/${userId}`, config(idToken))
}

/** Edit a single registration
 * PATCH /:slug/:registrationId
 */
RegistrationsService.editRegistration = (
    idToken,
    slug,
    registrationId,
    data
) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/${registrationId}`,
    //     data,
    //     config(idToken)
    // )
}

RegistrationsService.updateTravelGrantDetails = (idToken, slug, data) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/travel-grant-details`,
    //     { data },
    //     config(idToken)
    // )
}

RegistrationsService.adminUpdateTravelGrantDetails = (
    idToken,
    slug,
    registrationId,
    data
) => {
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/admin/travel-grant-details`,
    //     { registrationId, data },
    //     config(idToken)
    // )
}

RegistrationsService.adminNotifyRejectedTravelGrants = (idToken, slug) => {
    // return _axios.post(
    //     `${BASE_ROUTE}/${slug}/admin/travel-grant-details/notify-rejected`,
    //     {},
    //     config(idToken)
    // )
}

RegistrationsService.adminNotifyAcceptedTravelGrants = (idToken, slug) => {
    // return _axios.post(
    //     `${BASE_ROUTE}/${slug}/admin/travel-grant-details/notify-accepted`,
    //     {},
    //     config(idToken)
    // )
}

export default RegistrationsService
