import * as ActionTypes from './actionTypes'
import EventsService from 'services/events'

export const updateEvents = () => async dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_EVENTS,
        promise: EventsService.getPublicEvents(),
        meta: {
            onFailure: e => console.log('Failed to update events', e),
        },
    })
}
