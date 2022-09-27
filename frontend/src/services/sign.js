import _axios from 'services/axios'

const SigningService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

const BASE_ROUTE = '/sign'

SigningService.signTransaction = (idToken, data) => {
    return _axios.post(`${BASE_ROUTE}`, data, config(idToken))
}

export default SigningService
