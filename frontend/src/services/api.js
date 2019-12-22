import axios from 'axios'

const ApiService = {
    test: idToken => {
        return axios
            .get('/admin', {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            })
            .then(res => {
                return res
            })
    },
    getUserProfile: idToken => {
        return axios
            .get('/api/users', {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            })
            .then(res => res.data)
    },
}

export default ApiService
