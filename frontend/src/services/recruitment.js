import _axios from 'services/axios'

const RecruitmentService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

RecruitmentService.search = (idToken, filters, page, page_size, eventId) => {
    return _axios.post(
        '/recruitment/search',
        {
            filters,
            pagination: {
                page_size,
                page,
            },
            eventId,
        },
        config(idToken),
    )
}
RecruitmentService.getUserProfile = (idToken, userId) => {
    return _axios.get(`/recruitment/profile/${userId}`, config(idToken))
}

RecruitmentService.submitAction = (type, idToken, userId, organisation, message) => {
    return _axios.post(
        '/recruitment/action',
        {
            type,
            user: userId,
            organisation: organisation,
            data: { message: message },
        },
        config(idToken),
    )
}

RecruitmentService.getActionHistory = (idToken, organisation) => {
    return _axios.get(`/recruitment/action/${organisation}`, config(idToken))
}

export default RecruitmentService
