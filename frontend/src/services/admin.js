import axios from 'axios'

const AdminService = {}

function config(idToken) {
    return {
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    }
}

AdminService.getRoles = idToken => {
    return axios.get('/admin/roles', config(idToken)).then(res => res.data)
}

AdminService.getUsers = idToken => {
    return axios.get('/admin/users', config(idToken)).then(res => res.data)
}

export default AdminService
