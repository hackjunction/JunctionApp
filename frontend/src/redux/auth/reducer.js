import * as ActionTypes from './actionTypes'

const initialState = {
    session: {},
    nextRoute: '/',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_SESSION: {
            return {
                ...state,
                session: action.payload,
            }
        }
        case ActionTypes.SET_NEXT_ROUTE: {
            return {
                ...state,
                nextRoute: action.payload,
            }
        }
        case ActionTypes.RESET_NEXT_ROUTE: {
            return {
                ...state,
                nextRoute: initialState.nextRoute,
            }
        }
        case ActionTypes.CLEAR_SESSION: {
            return initialState
        }

        default:
            return state
    }
}
