import * as ActionTypes from './actionTypes'

export const connect = data => dispatch => {
    dispatch({
        type: ActionTypes.CONNECT,
        payload: data,
    })

    return data
}

export const disconnect = () => dispatch => {
    dispatch({
        type: ActionTypes.DISCONNECT,
    })
}
