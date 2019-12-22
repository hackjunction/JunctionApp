import * as ActionTypes from './actionTypes'
import * as AuthSelectors from '../auth/selectors'
import EventsService from 'services/events'
import RegistrationsService from 'services/registrations'

export const updateEvent = slug => async dispatch => {
    await dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getPublicEventBySlug(slug),
        meta: {
            onFailure: e => console.log('Error getting event', e),
        },
    })

    return
}

export const updateRegistration = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATION,
        promise: RegistrationsService.getRegistration(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting registration', e),
        },
    })
}

export const editRegistration = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const registration = await RegistrationsService.updateRegistration(
        idToken,
        slug,
        data
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}

export const createRegistration = (slug, data) => async (
    dispatch,
    getState
) => {
    const idToken = AuthSelectors.getIdToken(getState())
    const registration = await RegistrationsService.createRegistration(
        idToken,
        slug,
        data
    )

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration,
    })

    return registration
}
