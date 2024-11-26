import * as ActionTypes from './actionTypes'

const defaultState = {
    notifications: [],
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            }

        case ActionTypes.CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    action.dismissAll || notification.key === action.key
                        ? { ...notification, dismissed: true }
                        : { ...notification },
                ),
            }

        case ActionTypes.REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            }

        default:
            return state
    }
}
