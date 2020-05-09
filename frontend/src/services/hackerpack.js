import _axios from 'services/axios'

const HackerpackService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/hackerpack'

HackerpackService.createHackerpack = (idToken, data) => {
    console.log('creting!!!', data)
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

HackerpackService.updateHackerpack = (idToken, slug, data) => {
    console.log('updating with', data)
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

HackerpackService.getHackerpackBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/${slug}`)
}

/*
HackerpackService.getHackerpackByEvent = slug => {
    return _axios.get(`${BASE_ROUTE}/event/${slug}`)
}*/

export default HackerpackService
