import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';
import UserProfilesService from 'services/userProfiles';
import EventsService from 'services/events';
import RegistrationsService from 'services/registrations';
import TeamsService from 'services/teams';
import TravelGrantsService from 'services/travelGrants';
import FilterGroupsService from 'services/filterGroups';

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

export const editRegistration = (registrationId, data, slug) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const registration = await RegistrationsService.editRegistration(idToken, slug, registrationId, data);
    dispatch({
        type: ActionTypes.EDIT_REGISTRATION,
        payload: registration
    });

    return registration;
};

export const bulkEditRegistrations = (registrationIds, edits, slug) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    await RegistrationsService.bulkEditRegistrationsForEvent(idToken, slug, registrationIds, edits);

    dispatch(updateRegistrationsForEvent(slug));

    return;
};

/** Update event teams with loading/error data */
export const updateTeamsForEvent = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    if (!slug) return;

    dispatch({
        type: ActionTypes.UPDATE_TEAMS,
        promise: TeamsService.getTeamsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating teams', e)
        }
    });
};

/** Update travel grants with loading/error status */
export const updateTravelGrants = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    if (!slug) return;

    dispatch({
        type: ActionTypes.UPDATE_TRAVEL_GRANTS,
        promise: TravelGrantsService.getTravelGrantsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating travel grants', e)
        }
    });
};

export const createTravelGrant = (slug, sum, travelsFrom, userId) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    if (!slug) return;

    const travelGrant = await TravelGrantsService.createTravelGrantForUser(idToken, slug, sum, travelsFrom, userId);

    dispatch({
        type: ActionTypes.CREATE_TRAVEL_GRANT,
        payload: travelGrant
    });

    return;
};

/** Update filter groups with loading/error status */
export const updateFilterGroups = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_FILTER_GROUPS,
        promise: FilterGroupsService.getFilterGroupsForEvent(idToken, slug),
        meta: {
            onFailure: e => console.log('Error updating filter groups', e)
        }
    });

    return;
};

export const createFilterGroup = (slug, label, description, filters) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const filterGroup = await FilterGroupsService.createFilterGroup(idToken, label, description, filters, slug);

    dispatch({
        type: ActionTypes.CREATE_FILTER_GROUP,
        payload: filterGroup
    });

    return filterGroup;
};

export const editFilterGroup = (slug, label, description, filters) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const filterGroup = await FilterGroupsService.editFilterGroup(idToken, label, description, filters, slug);

    dispatch({
        type: ActionTypes.EDIT_FILTER_GROUP,
        payload: filterGroup
    });

    return filterGroup;
};

export const deleteFilterGroup = (slug, label) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const filterGroup = await FilterGroupsService.deleteFilterGroup(idToken, label, slug);

    dispatch({
        type: ActionTypes.DELETE_FILTER_GROUP,
        payload: filterGroup
    });

    return filterGroup;
};
