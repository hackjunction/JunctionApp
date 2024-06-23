import * as ActionTypes from './actionTypes'
import * as AuthActionTypes from 'reducers/auth/actionTypes'

const initialState = {
    profile: null,
    profileLoading: false,
    profileError: false,
    registrations: {},
    registrationsLoading: false,
    registrationsError: false,
    accessRight: 'participant',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_PROFILE: {
            switch(action.status) {
                case 'start':
                    return {
                        ...state,
                        profileLoading: true,
                        profileError: false,
                    }
                case 'finish':
                    return {
                        ...state,
                        profileLoading: false,
                    }
                case 'failure':
                    return {
                        ...state,
                        profileError: true,
                    }
                case 'success':
                    return {
                        ...state,
                        profile: action.payload,
                    }
                default:
                    return state
            }
        }
        case ActionTypes.SET_PROFILE: {
            return {
                ...state,
                profile: action.payload,
            }
        }
        case ActionTypes.SET_REGISTRATION: {
            return {
                ...state,
                registrations: {
                    ...state.registrations,
                    [action.payload.eventId]: action.payload.registration,
                },
            }
        }
        case AuthActionTypes.CLEAR_SESSION: {
            return initialState
        }
        case ActionTypes.SET_ACCESSRIGHT: {
            return {
                ...state,
                accessRight: action.payload.accessRight
            }
        }
        case ActionTypes.ORGANIZER_EVENTS: {
            return {
                ...state,
                organizerEvents: action.payload.organizerEvents
            }
        }
        default:
            return state
    }
}
