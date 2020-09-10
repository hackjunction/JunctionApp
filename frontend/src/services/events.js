import _axios from 'services/axios'

const EventsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/events'

EventsService.createEvent = (idToken, data) => {
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

EventsService.getEventsByOrganiser = idToken => {
    return _axios.get(`${BASE_ROUTE}`, config(idToken))
}

EventsService.getPublicEvents = () => {
    return _axios.get(`${BASE_ROUTE}/public`)
}

EventsService.getPublicEventBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/public/${slug}`)
}

EventsService.getPublicEventById = id => {
    return _axios.get(`${BASE_ROUTE}/public/id/${id}`)
}

EventsService.updateEventBySlug = (idToken, slug, data) => {
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

EventsService.getEventBySlugAsOrganiser = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}`, config(idToken))
}

EventsService.deleteEventBySlugAsOrganiser = (idToken, slug) => {
    return _axios.delete(`${BASE_ROUTE}/${slug}`, config(idToken))
}

EventsService.getOrganisers = (idToken, slug) => {
    return _axios.get(`/events/organisers/${slug}`, config(idToken))
}

EventsService.addOrganiserToEvent = (idToken, slug, userId) => {
    return _axios.post(
        `/events/organisers/${slug}/${userId}`,
        {},
        config(idToken),
    )
}

EventsService.removeOrganiserFromEvent = (idToken, slug, userId) => {
    return _axios.delete(
        `/events/organisers/${slug}/${userId}`,
        config(idToken),
    )
}

EventsService.getOrganizations = (idToken, slug) => {
    return _axios.get(`/events/organizations/${slug}`, config(idToken))
}

EventsService.addOrganizationToEvent = (idToken, slug, orgSlug) => {
    return _axios.post(
        `/events/organizations/${slug}/${orgSlug}`,
        {},
        config(idToken),
    )
}

EventsService.removeOrganizationFromEvent = (idToken, slug, orgSlug) => {
    return _axios.delete(
        `/events/organizations/${slug}/${orgSlug}`,
        config(idToken),
    )
}

EventsService.updateWinners = (idToken, slug, winners) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/winners`,
        { winners },
        config(idToken),
    )
}

EventsService.getWinnerProjects = (idToken, slug) => {
    return _axios.get(`${BASE_ROUTE}/${slug}/winners`, config(idToken))
}

EventsService.generateAchievements = (idToken, slug) => {
    return _axios.patch(
        `${BASE_ROUTE}/${slug}/achievements`,
        {},
        config(idToken),
    )
}

export default EventsService
