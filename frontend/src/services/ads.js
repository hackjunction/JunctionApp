import _axios from 'services/axios'

const AdService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/ad'

AdService.createAd = (idToken, data) => {
    console.log('creting!!!', data)
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

AdService.updateAd = (idToken, slug, data) => {
    console.log('updating with', data)
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

AdService.getAdBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/${slug}`)
}

AdService.deleteAd = (idToken, slug) => {
    return _axios.delete(`${BASE_ROUTE}/${slug}`, config(idToken))
}

AdService.getFullAd = () => {
    return _axios.get(`${BASE_ROUTE}`)
}

export default AdService
