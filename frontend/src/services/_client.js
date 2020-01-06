import ky from 'ky'

/** Wrap our api client so we can easily substitute it if need be */
const attachToken = idToken => request => {
    if (idToken) {
        request.headers.set('Authorization', `Bearer ${idToken}`)
    }
}

const logRequest = (request, options) => {
    console.info(`${request.method}: ${request.url}`, options)
}

const logResponse = async (_request, _options, response) => {
    const json = await response.json()
    console.info(`${response.status} ${_request.url}`, json)
}

export default {
    get: idToken => async (url, options) => {
        const response = await ky
            .get(url, {
                ...options,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()
        return response.data
    },
    post: idToken => async (url, body, options) => {
        const response = await ky
            .post(url, {
                ...options,
                json: body,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()
        return response.data
    },
    patch: idToken => async (url, body, options) => {
        const response = await ky
            .patch(url, {
                ...options,
                json: body,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()

        return response.data
    },
    put: idToken => async (url, body, options) => {
        const response = await ky
            .put(url, {
                ...options,
                json: body,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()
        return response.data
    },
    delete: idToken => async (url, options) => {
        const response = await ky
            .delete(url, {
                ...options,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()
        return response.data
    },
    head: idToken => async (url, options) => {
        const response = await ky
            .head(url, {
                ...options,
                hooks: {
                    beforeRequest: [attachToken(idToken), logRequest],
                    afterResponse: [logResponse],
                },
            })
            .json()
        return response
    },
}
