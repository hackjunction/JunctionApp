import _axios from 'services/axios'

const EmailService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/email'

EmailService.sendPreviewEmail = ({ idToken, slug, to, params, from = {} }) => {
    const data = {
        to,
        params,
        from,
    }
    return _axios.post(`${BASE_ROUTE}/${slug}/preview`, data, config(idToken))
}

EmailService.sendBulkEmail = (idToken, slug, recipients, params, uniqueId) => {
    const data = {
        recipients,
        params,
        uniqueId,
    }

    return _axios.post(`${BASE_ROUTE}/${slug}/send`, data, config(idToken))
}

EmailService.sendContactEmail = params => {
    const data = {
        params,
    }
    return _axios.post(`${BASE_ROUTE}/contact`, data)
}

export default EmailService
