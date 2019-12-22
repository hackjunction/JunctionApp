import * as ActionTypes from './actionTypes'
import * as AuthActionTypeas from 'redux/auth/actionTypes'
import { handle } from 'redux-pack'

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
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    usersLoading: true,
                    usersError: false,
                }),
                finish: prevState => ({ ...prevState, usersLoading: false }),
                failure: prevState => ({ ...prevState, usersError: true }),
                success: prevState => ({
                    ...prevState,
                    users: action.payload,
                    usersUpdated: Date.now(),
                }),
            })
        }
        case ActionTypes.LOAD_ROLES: {
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    rolesLoading: true,
                    rolesError: false,
                }),
                finish: prevState => ({ ...prevState, rolesLoading: false }),
                failure: prevState => ({ ...prevState, rolesError: true }),
                success: prevState => ({
                    ...prevState,
                    roles: action.payload,
                    rolesUpdated: Date.now(),
                }),
            })
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
