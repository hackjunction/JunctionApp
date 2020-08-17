import _axios from 'services/axios'

const OrganizationService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/organization'

OrganizationService.createOrganization = (idToken, data) => {
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

OrganizationService.updateOrganization = (idToken, slug, data) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

OrganizationService.getOrganizationBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/${slug}`)
}

OrganizationService.deleteOrganization = (idToken, slug) => {
    return _axios.delete(`${BASE_ROUTE}/${slug}`, config(idToken))
}

OrganizationService.getOrganizations = () => {
    return _axios.get(`${BASE_ROUTE}`)
}

export default OrganizationService
