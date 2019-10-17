import _axios from 'services/axios';

const RecruitmentService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

RecruitmentService.search = idToken => {
    return _axios.post(
        '/recruitment/search',
        {
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

export default RecruitmentService;
