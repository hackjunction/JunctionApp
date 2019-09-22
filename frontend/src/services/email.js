import _axios from 'services/axios';

const EmailService = {};

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    };
}

const BASE_ROUTE = '/email';

EmailService.sendPreviewEmail = (idToken, slug, to, params) => {
    const data = {
        to,
        params
    };
    console.log('SENDING TEST WITH', params);
    return _axios.post(`${BASE_ROUTE}/${slug}/preview`, data, config(idToken));
};

export default EmailService;
