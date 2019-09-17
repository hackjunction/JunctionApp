import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';
import UserProfilesService from 'services/userProfiles';
import EventsService from 'services/events';
import RegistrationsService from 'services/registrations';

/** Update event with loading/error data */
export const updateEvent = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getEventBySlugAsOrganiser(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating event', e)
        }
    });
};

/** Submit edits to an event */
export const editEvent = (slug, data) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const event = await EventsService.updateEventBySlug(idToken, slug, data);
    dispatch({ type: ActionTypes.EDIT_EVENT, payload: event });
    return event;
};

/** Update event stats with loading/error data */
export const updateEventStats = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_STATS,
        promise: EventsService.getEventStats(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating event stats', e)
        }
    });
};

/** Update event organisers with loading/error data */
export const updateOrganisersForEvent = (owner, organisers) => async (dispatch, getState) => {
    const userIds = [owner].concat(organisers);

    dispatch({
        type: ActionTypes.UPDATE_ORGANISERS,
        promise: UserProfilesService.getPublicUserProfiles(userIds),
        meta: {
            onFailure: e => console.log('Error updating event organisers', e)
        }
    });
};

export const removeOrganiserFromEvent = (slug, userId) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const organisers = await EventsService.removeOrganiserFromEvent(idToken, slug, userId);
    dispatch({
        type: ActionTypes.REMOVE_ORGANISER,
        payload: userId
    });

    return organisers;
};

export const addOrganiserToEvent = (slug, userId) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const organisers = await EventsService.addOrganiserToEvent(idToken, slug, userId);
    dispatch({
        type: ActionTypes.ADD_ORGANISER,
        payload: userId
    });

    return organisers;
};

/** Update event registrations with loading/error data */
export const updateRegistrationsForEvent = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    if (!slug) return;

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATIONS,
        promise: RegistrationsService.getRegistrationsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating registrations', e)
        }
    });
};

/** Set filters for attendees table */
export const setRegistrationsFilters = filters => dispatch => {
    dispatch({
        type: ActionTypes.SET_REGISTRATIONS_FILTERS,
        payload: filters
    });
};
