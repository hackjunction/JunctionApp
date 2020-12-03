import _axios from 'services/axios'

const BannerService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/banner'

BannerService.createBanner = (idToken, data) => {
    console.log('creting!!!', data)
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

BannerService.updateBanner = (idToken, slug, data) => {
    console.log('updating with', data)
    return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

BannerService.getBannerBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/${slug}`)
}

BannerService.deleteBanner = (idToken, slug) => {
    return _axios.delete(`${BASE_ROUTE}/${slug}`, config(idToken))
}

BannerService.getAllBanners = () => {
    return _axios.get(`${BASE_ROUTE}`)
}

export default BannerService
