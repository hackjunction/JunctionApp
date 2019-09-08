import * as ActionTypes from './actionTypes';
import * as AuthSelectors from '../auth/selectors';
import EventsService from 'services/events';
import RegistrationsService from 'services/registrations';

export const updateEvent = slug => async dispatch => {
    const result = await dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getPublicEventBySlug(slug),
        meta: {
            onFailure: e => console.log('Error getting event', e)
        }
    });

    console.log('UPDATE EVENT', result);

    return;
};

export const updateRegistration = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const result = await dispatch({
        type: ActionTypes.UPDATE_REGISTRATION,
        promise: RegistrationsService.getRegistration(idToken, slug),
        meta: {
            onFailure: e => console.log('Error getting registration', e)
        }
    });

    console.log('RESULT!', result);
};

export const editRegistration = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    const registration = await RegistrationsService.updateRegistration(idToken, slug, data);

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration
    });

    return registration;
};

export const createRegistration = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    const registration = await RegistrationsService.createRegistration(idToken, slug, data);

    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration
    });

    return registration;
};
