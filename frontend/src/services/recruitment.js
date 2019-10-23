import _axios from 'services/axios';

const RecruitmentService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

RecruitmentService.search = (idToken, filters) => {
    return _axios.post(
        '/recruitment/search',
        {
            filters,
            pagination: {
                page_size: 25,
                page: 0
            }
        },
        config(idToken)
    );
};
RecruitmentService.getUserProfile = (idToken, userId) => {
    return _axios.get(`/recruitment/profile/${userId}`, config(idToken));
};

RecruitmentService.submitAction = (type, idToken, recruiter, userId, organization, message) => {
    return _axios.post(
        '/recruitment/action',
        {
            action: {
                type,
                recruiter,
                organization,
                userId,
                data: { message: message }
            }
        },
        config(idToken)
    );
};

export default RecruitmentService;
