import * as ActionTypes from './actionTypes'
import { buildHandler } from '../utils'

const initialState = {
    event: {
        data: {},
        loading: true,
        error: false,
        updated: 0,
    },
    registration: {
        data: {},
        loading: true,
        error: false,
        updated: 0,
    },
}

const eventHandler = buildHandler('event')
const registrationHandler = buildHandler('registration')

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_EVENT: {
            return eventHandler(state, action)
        }
        case ActionTypes.UPDATE_REGISTRATION: {
            return registrationHandler(state, action)
        }
        default:
            return state
    }
}
