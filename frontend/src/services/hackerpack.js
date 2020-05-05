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
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

HackerpackService.updateHackerpack = (id, data) => {
    return _axios.patch(`${BASE_ROUTE}/id/${id}`, { data })
}

HackerpackService.getHackerpack = id => {
    return _axios.get(`${BASE_ROUTE}/id/${id}`)
}

HackerpackService.getHackerpackByEvent = slug => {
    return _axios.get(`${BASE_ROUTE}/event/${slug}`)
}

export default HackerpackService
