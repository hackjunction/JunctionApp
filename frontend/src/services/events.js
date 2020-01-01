import client from 'services/_client'

const EventsService = {}

EventsService.createEvent = (idToken, data) => {
    const url = `/api/events`
    return client.get(idToken)(url, data)
}

EventsService.getEventsByOrganiser = idToken => {
    const url = `/api/events`
    return client.get(idToken)(url)
}

EventsService.updateEventBySlug = (idToken, slug, data) => {
    const url = `/api/events/${slug}`
    return client.patch(idToken)(url, data)
}

EventsService.getEventBySlugAsOrganiser = (idToken, slug) => {
    const url = `/api/events/${slug}`
    return client.get(idToken)(url)
}

EventsService.deleteEventBySlugAsOrganiser = (idToken, slug) => {
    const url = `/api/events/${slug}`
    return client.delete(idToken)(url)
}

EventsService.getPublicEvents = () => {
    const url = `/api/events/public`
    return client.get()(url)
}

EventsService.getPublicEventBySlug = slug => {
    const url = `/api/events/public/${slug}`
    return client.get()(url)
}

EventsService.getPublicEventById = id => {
    const url = `/api/events/public/id/${id}`
    return client.get()(url)
}

EventsService.getOrganisers = (idToken, slug) => {
    const url = `/api/events/organisers/${slug}`
    return client.get(idToken)(url)
}

EventsService.addOrganiserToEvent = (idToken, slug, userId) => {
    const url = `/api/events/organisers/${slug}/${userId}`
    return client.post(idToken)(url, {})
}

EventsService.removeOrganiserFromEvent = (idToken, slug, userId) => {
    const url = `/api/events/organisers/${slug}/${userId}`
    return client.delete(idToken)(url)
}

EventsService.updateWinners = (idToken, slug, winners) => {
    throw new Error('TODO: Refactor this route')
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/winners`,
    //     { winners },
    //     config(idToken)
    // )
}

EventsService.getWinnerProjects = (idToken, slug) => {
    throw new Error('TODO: Refactor this route')
    //return _axios.get(`${BASE_ROUTE}/${slug}/winners`, config(idToken))
}

EventsService.generateAchievements = (idToken, slug) => {
    throw new Error('TODO: Refactor this route')
    // return _axios.patch(
    //     `${BASE_ROUTE}/${slug}/achievements`,
    //     {},
    //     config(idToken)
    // )
}

export default EventsService
