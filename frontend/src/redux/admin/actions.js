import { filter, concat } from 'lodash-es'

import * as ActionTypes from './actionTypes'
import { getUsersFiltersRoles } from './selectors'

import { getIdToken } from 'redux/auth/selectors'
import AdminService from 'services/admin'

import HackerpackService from 'services/hackerpack'
import OrganizationService from 'services/organization'

export const updateUsers = () => (dispatch, getState) => {
    const idToken = getIdToken(getState())
    dispatch({
        type: ActionTypes.LOAD_USERS,
        promise: AdminService.getUsers(idToken),
        meta: {
            onFailure: e => console.log('Error in updateUsers', e),
        },
    })
}

export const updateRoles = () => (dispatch, getState) => {
    const idToken = getIdToken(getState())
    dispatch({
        type: ActionTypes.LOAD_ROLES,
        promise: AdminService.getRoles(idToken),
        meta: {
            onFailure: e => console.log('Error in updateRoles', e),
        },
    })
}

export const toggleUsersFiltersRole = role => (dispatch, getState) => {
    const roles = getUsersFiltersRoles(getState())
    let newRoles
    if (roles.indexOf(role) !== -1) {
        newRoles = filter(roles, r => r !== role)
    } else {
        newRoles = concat(roles, role)
    }

    dispatch({
        type: ActionTypes.SET_USERS_FILTERS_ROLES,
        payload: newRoles,
    })
}

export const toggleUsersFiltersSortBy = field => dispatch => {
    dispatch({
        type: ActionTypes.SET_USERS_FILTERS_SORT_BY,
        payload: field,
    })
}

export const editHackerpack = (idToken, slug, values) => async (
    dispatch,
    getState,
) => {
    const hackerpack = await HackerpackService.updateHackerpack(
        idToken,
        slug,
        values,
    )
    return hackerpack
}

export const editOrganization = (idToken, slug, values) => async (
    dispatch,
    getState,
) => {
    const organization = await OrganizationService.updateOrganization(
        idToken,
        slug,
        values,
    )
    return organization
}
