import * as ActionTypes from './actionTypes'
import * as AuthActionTypeas from 'reducers/auth/actionTypes'

const initialState = {
    users: [],
    usersLoading: false,
    usersError: false,
    usersUpdated: 0,
    usersFilters: {
        roles: [],
        sortBy: null,
    },
    roles: [],
    rolesLoading: false,
    rolesError: false,
    rolesUpdated: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOAD_USERS: {
            switch(action.status) {
                case 'start':
                    return {
                        ...state,
                        usersLoading: true,
                        usersError: false,
                    }
                case 'finish':
                    return {
                        ...state,
                        usersLoading: false,
                    }
                case 'failure':
                    return {
                        ...state,
                        usersError: true,
                    }
                case 'success':
                    return {
                        ...state,
                        users: action.payload,
                        usersUpdated: Date.now(),
                    }
                default:
                    return state
            }
        }
        case ActionTypes.LOAD_ROLES: {
            switch(action.status) {
                case 'start':
                    return {
                        ...state,
                        rolesLoading: true,
                        rolesError: false,
                    }
                case 'finish':
                    return {
                        ...state,
                        rolesLoading: false,
                    }
                case 'failure':
                    return {
                        ...state,
                        rolesError: true,
                    }
                case 'success':
                    return {
                        ...state,
                        roles: action.payload,
                        rolesUpdated: Date.now(),
                    }
                default:
                    return state
            }
        }
        case ActionTypes.SET_USERS_FILTERS_ROLES: {
            return {
                ...state,
                usersFilters: {
                    ...state.usersFilters,
                    roles: action.payload,
                },
            }
        }
        case ActionTypes.SET_USERS_FILTERS_SORT_BY: {
            return {
                ...state,
                usersFilters: {
                    ...state.usersFilters,
                    sortBy: action.payload,
                },
            }
        }
        case AuthActionTypeas.CLEAR_SESSION: {
            return initialState
        }
        default:
            return state
    }
}
