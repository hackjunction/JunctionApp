import * as ActionTypes from './actionTypes'
import * as AuthSelectors from '../auth/selectors'
import RegistrationsService from 'services/registrations'

export const updateRegistrations = () => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const registrations = await RegistrationsService.getUserRegistrations(
        idToken
    )

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATIONS,
        payload: registrations,
    })

    return registrations
}
