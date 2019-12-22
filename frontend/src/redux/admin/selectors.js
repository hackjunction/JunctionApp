import { createSelector } from 'reselect'

export const getUsers = state => state.admin.users
export const usersLoading = state => state.admin.usersLoading
export const usersError = state => state.admin.usersError
export const usersUpdated = state => state.admin.usersUpdated

export const usersShouldUpdate = createSelector(
    usersUpdated,
    updated => Date.now() - usersUpdated > 1000 * 60 * 5
)

export const getRoles = state => state.admin.roles
export const rolesLoading = state => state.admin.rolesLoading
export const rolesError = state => state.admin.rolesError
export const rolesUpdated = state => state.admin.rolesUpdated

export const rolesShouldUpdate = createSelector(
    rolesUpdated,
    updated => Date.now() - rolesUpdated > 1000 * 60 * 5
)

export const getUsersFilters = state => state.admin.usersFilters
export const getUsersFiltersRoles = state => state.admin.usersFilters.roles
export const getUsersFiltersSortBy = state => state.admin.usersFilters.sortBy
