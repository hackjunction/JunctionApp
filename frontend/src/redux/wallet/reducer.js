import * as ActionTypes from './actionTypes'

const initialState = {
    address: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CONNECT: {
            return {
                address: action.payload,
            }
        }

        case ActionTypes.DISCONNECT: {
            return {
                address: null,
            }
        }
        default:
            return state
    }
}
