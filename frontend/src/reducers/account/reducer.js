import * as ActionTypes from './actionTypes'

const initialState = {
    registrations: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_REGISTRATIONS: {
            return {
                ...state,
                registrations: action.payload,
            }
        }
        default:
            return state
    }
}
