import * as ActionTypes from './actionTypes'

export const success = (message, options) => dispatch => {
    dispatch(
        enqueueSnackbar({
            message,
            options: {
                variant: 'success',
                ...options,
            },
        }),
    )
}

export const error = (message, options) => dispatch => {
    dispatch(
        enqueueSnackbar({
            message,
            options: {
                variant: 'error',
                ...options,
            },
        }),
    )
}

export const warning = (message, options) => dispatch => {
    dispatch(
        enqueueSnackbar({
            message,
            options: {
                variant: 'warning',
                ...options,
            },
        }),
    )
}

export const show = (message, options) => dispatch => {
    dispatch(
        enqueueSnackbar({
            message,
            options,
        }),
    )
}

export const enqueueSnackbar = notification => {
    const key = notification?.options?.key

    return {
        type: ActionTypes.ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    }
}

export const closeSnackbar = key => ({
    type: ActionTypes.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
})

export const removeSnackbar = key => ({
    type: ActionTypes.REMOVE_SNACKBAR,
    key,
})
