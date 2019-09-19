import _axios from 'services/axios';

const RegistrationsService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

const BASE_ROUTE = '/registrations';

RegistrationsService.getUserRegistrations = idToken => {
    return _axios.get(`${BASE_ROUTE}`, config(idToken));
};

RegistrationsService.getRegistration = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}`, config(idToken));
};

RegistrationsService.createRegistration = (idToken, slug, data, subscribe = false) => {
    return _axios.post(`${BASE_ROUTE}/${slug}/?subscribe=${subscribe}`, data, config(idToken));
};

RegistrationsService.updateRegistration = (idToken, slug, data) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken));
};

RegistrationsService.getRegistrationsForEvent = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/all`, config(idToken));
};

RegistrationsService.bulkEditRegistrationsForEvent = (idToken, slug, registrationIds, edits) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/bulk`, { registrationIds, edits }, config(idToken));
};

RegistrationsService.searchRegistrationsForEvent = (idToken, slug, filters) => {
    const options = {
        ...config(idToken),
        params: filters
    };
    return _axios.get(`${BASE_ROUTE}/${slug}/search`, options);
};

RegistrationsService.assignRandomRegistrations = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/assign`, config(idToken));
};

RegistrationsService.assignRegistration = (idToken, slug, registrationId, userId) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/assign`, { registrationId, userId }, config(idToken));
};

RegistrationsService.getFullRegistration = (idToken, slug, registrationId) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/${registrationId}`, config(idToken));
};

RegistrationsService.editRegistration = (idToken, slug, registrationId, data) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/${registrationId}`, data, config(idToken));
};

RegistrationsService.rateRegistration = (idToken, slug, registrationId, rating) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/${registrationId}/rate`, { rating }, config(idToken));
};

RegistrationsService.acceptRegistration = (idToken, slug, registrationId) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/${registrationId}/accept`, {}, config(idToken));
};

RegistrationsService.rejectRegistration = (idToken, slug, registrationId) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}/${registrationId}/reject`, {}, config(idToken));
};

export default RegistrationsService;
