import * as ActionTypes from './actionTypes'
import { handle } from 'redux-pack'

const initialState = {
    data: [],
    loading: true,
    error: false,
    updated: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENTS: {
            return handle(state, action, {
                start: prevState => ({
                    ...prevState,
                    loading: true,
                    error: false,
                }),
                finish: prevState => ({ ...prevState, loading: false }),
                failure: prevState => ({ ...prevState, error: true }),
                success: prevState => ({
                    ...prevState,
                    data: action.payload,
                    updated: Date.now(),
                }),
            })
        }
        default:
            return state
    }
}
