const { ManagementClient } = require('auth0')
const Shared = require('@hackjunction/shared')

const AuthConstants = Shared.Auth
const axios = require('axios')
const _ = require('lodash')
const request = require('request')

/* Auth0 management api config */
const auth0 = new ManagementClient({
    domain: global.gConfig.AUTH0_DOMAIN,
    clientId: global.gConfig.AUTH0_CLIENT_ID,
    clientSecret: global.gConfig.AUTH0_CLIENT_SECRET,
    scope: 'read:users update:users read:roles',
})

const controller = {}

function getAuthorizationToken() {
    const options = {
        method: 'POST',
        url: `https://${global.gConfig.AUTH0_DOMAIN}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'client_credentials',
            client_id: global.gConfig.AUTH0_CLIENT_ID,
            client_secret: global.gConfig.AUTH0_CLIENT_SECRET,
            audience: 'urn:auth0-authz-api',
        },
    }

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                resolve(JSON.parse(body))
            }
        })
    })
}

function config(access_token) {
    return {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    }
}

function getRoles(access_token) {
    return axios
        .get(
            `${global.gConfig.AUTH0_AUTHORIZATION_EXTENSION_URL}/roles`,
            config(access_token),
        )
        .then(res => res.data.roles)
}

function getRoleByName(access_token, role) {
    return getRoles(access_token).then(roles => {
        return _.find(roles, r => r.name === role)
    })
}

function assignRole(access_token, userId, roleId) {
    return axios
        .patch(
            `${global.gConfig.AUTH0_AUTHORIZATION_EXTENSION_URL}/users/${userId}/roles`,
            [roleId],
            config(access_token),
        )
        .then(res => res.data)
}

function removeRole(access_token, userId, roleId) {
    return axios
        .delete(
            `${global.gConfig.AUTH0_AUTHORIZATION_EXTENSION_URL}/users/${userId}/roles`,
            {
                ...config(access_token),
                data: [roleId],
            },
        )
        .then(res => res.data)
}

controller.grantAssistantOrganiser = async userId => {
    const { access_token } = await getAuthorizationToken()
    const role = await getRoleByName(
        access_token,
        AuthConstants.Roles.ASSISTANT_ORGANISER,
    )
    return assignRole(access_token, userId, role._id)
}

controller.revokeAssistantOrganiser = async userId => {
    const { access_token } = await getAuthorizationToken()
    const role = await getRoleByName(
        access_token,
        AuthConstants.Roles.ASSISTANT_ORGANISER,
    )
    return removeRole(access_token, userId, role._id)
}

controller.grantRecruiterPermission = async userId => {
    const { access_token } = await getAuthorizationToken()
    const role = await getRoleByName(
        access_token,
        AuthConstants.Roles.RECRUITER,
    )
    return assignRole(access_token, userId, role._id)
}

controller.revokeRecruiterPermission = async userId => {
    const { access_token } = await getAuthorizationToken()
    const role = await getRoleByName(
        access_token,
        AuthConstants.Roles.RECRUITER,
    )
    return removeRole(access_token, userId, role._id)
}

controller.updateMetadata = async (userId, updates) => {
    const user = await auth0.getUser({ id: userId })
    const metadata = { ...user.user_metadata, ...updates }
    const updatedUser = await auth0.updateUserMetadata({ id: userId }, metadata)
    return updatedUser
}

controller.deleteUser = async userId => {
    const deletedUser = await auth0.deleteUser({ id: userId })
    return deletedUser
}

module.exports = controller
