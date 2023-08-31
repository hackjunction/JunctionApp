import { createSelector } from 'reselect'
import { reduce, difference } from 'lodash-es'
import { Auth } from '@hackjunction/shared'
import config from 'constants/config'

const namespace = config.ID_TOKEN_NAMESPACE

export const getAccessToken = state => state.auth.session.accessToken || null
export const getIdToken = state => state.auth.session.idToken || null
export const getIdTokenPayload = state =>
    state.auth.session.idTokenPayload || null
export const getUserId = state => state?.auth?.session?.idTokenPayload?.sub
export const getSession = state => state.auth.session
export const getSessionExpiresAt = state =>
    state.auth.session ? state.auth.session.expiresAt : 0
export const getNextRoute = state => state.auth.nextRoute
export const isAuthenticated = state => {
    // console.log("is authenticated? ", getIdToken(state)!== null)
    return getIdToken(state) !== null
}
export const isSessionExpired = state => {
    // console.log("sessien erpires at ", new Date().getTime(), state.auth.session.expiresAt, new Date().getTime() > state.auth.session.expiresAt)
    return new Date().getTime() > state.auth.session.expiresAt
}

export const getRoles = state =>
    state.auth.session.idTokenPayload
        ? state.auth.session.idTokenPayload[namespace + 'roles']
        : []

export const getPermissions = state =>
    state.auth.session.idTokenPayload
        ? state.auth.session.idTokenPayload[namespace + 'permissions']
        : []

export const getHasPermission = state => {
    const permissions = getPermissions(state)
    return requiredPermissions => {
        return difference(requiredPermissions, permissions).length === 0
    }
}

export const getHasRole = state => {
    const roles = getRoles(state)
    // TODO This runs super often,  fix
    // console.log('roles are', roles)
    return requiredRoles => {
        return difference(requiredRoles, roles).length === 0
    }
}

export const idTokenData = createSelector(getIdTokenPayload, data => {
    if (!data) {
        return
    }

    return reduce(
        Object.keys(data),
        (result, field) => {
            result[field.replace(namespace, '')] = data[field]
            return result
        },
        {},
    )
})

export const hasRecruiterAccess = createSelector(
    getHasPermission,
    idTokenData,
    (hasPermission, idTokenData) => {
        return (
            hasPermission([Auth.Permissions.ACCESS_RECRUITMENT]) &&
            idTokenData.recruiter_events &&
            idTokenData.recruiter_events.length > 0 &&
            idTokenData.recruiter_organisation
        )
    },
)

export const hasOrganiserAccess = createSelector(
    getHasPermission,
    hasPermission => {
        return hasPermission([Auth.Permissions.MANAGE_EVENT])
    },
)

export const hasSuperAdmin = createSelector(getHasRole, hasPermission => {
    return hasPermission([Auth.Roles.SUPER_ADMIN])
})
