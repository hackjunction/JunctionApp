import _axios from 'services/axios'

const MentorsService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/mentors'

MentorsService.createMentors = (idToken, data) => {
    console.log('creating!!!', data)
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

MentorsService.createMentorsBySlug = (idToken, data, slug) => {
    console.log('creating!!!', data)
    return _axios.post(`${BASE_ROUTE}/${slug}`, data, config(idToken))
}

// MentorsService.updateMentors = (idToken, slug, data) => {
//     console.log('updating with', data)
//     return _axios.patch(`${BASE_ROUTE}/${slug}`, data, config(idToken))
// }

MentorsService.getMentorsBySlug = slug => {
    return _axios.get(`${BASE_ROUTE}/${slug}`)
}

// MentorsService.deleteMentors = (idToken, slug) => {
//     return _axios.delete(`${BASE_ROUTE}/${slug}`, config(idToken))
// }

MentorsService.getFullMentors = () => {
    return _axios.get(`${BASE_ROUTE}`)
}

export default MentorsService
