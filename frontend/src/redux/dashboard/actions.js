import { sortBy } from 'lodash-es';

import * as ActionTypes from './actionTypes';
import * as AuthSelectors from '../auth/selectors';
import * as DashboardSelectors from './selectors';
import EventsService from 'services/events';
import RegistrationsService from 'services/registrations';
import TeamsService from 'services/teams';
import UserProfilesService from 'services/userProfiles';

export const updateEvent = slug => dispatch => {
    dispatch({
        type: ActionTypes.UPDATE_EVENT,
        promise: EventsService.getPublicEventBySlug(slug),
        meta: {
            onFailure: e => console.log('Error updating dashboard event', e)
        }
    });
};

export const updateRegistration = slug => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_REGISTRATION,
        promise: RegistrationsService.getRegistration(idToken, slug).catch(err => {
            if (err.response.status === 404) {
                return Promise.resolve({});
            }
            return Promise.reject(err);
        }),
        meta: {
            onFailure: e => console.log('Error updating dashboard registration', e)
        }
    });
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

export const updateProfiles = team => async dispatch => {
    if (!team) {
        dispatch({
            type: ActionTypes.EDIT_PROFILES,
            payload: []
        });
    }

    const userIds = [team.owner].concat(team.members);

    dispatch({
        type: ActionTypes.UPDATE_PROFILES,
        promise: UserProfilesService.getPublicUserProfiles(userIds).then(profiles => {
            const sorted = sortBy(profiles, profile => {
                if (profile.userId === team.owner) {
                    return 0;
                }
                return 1;
            });

            return sorted;
        }),
        meta: {
            onFailure: e => console.log('Error updating profiles', e)
        }
    });
};

export const updateTeam = slug => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_TEAM,
        promise: TeamsService.getTeamForEvent(idToken, slug).catch(err => {
            if (err.response.status === 404) {
                return Promise.resolve({});
            }
            return Promise.reject(err);
        }),
        meta: {
            onFailure: e => console.log('Error updating dashboard team', e)
        }
    });
};

export const createTeam = slug => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const team = await TeamsService.createTeamForEvent(idToken, slug);

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team
    });

    return team;
};

export const joinTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const team = await TeamsService.joinTeamForEvent(idToken, slug, code);

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team
    });

    return team;
};

export const leaveTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    const team = await TeamsService.leaveTeamForEvent(idToken, slug, code);

    dispatch({
        type: ActionTypes.CLEAR_TEAM
    });

    return team;
};

export const removeMemberFromTeam = (slug, code, userId) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    const team = await TeamsService.removeMemberFromTeam(idToken, slug, code, userId);

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team
    });

    return team;
};

export const deleteTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    const team = await TeamsService.deleteTeamForEvent(idToken, slug, code);

    dispatch({
        type: ActionTypes.CLEAR_TEAM
    });

    return team;
};

export const lockTeam = (slug, code) => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());
    const team = await TeamsService.lockTeamForEvent(idToken, slug, code);

    dispatch({
        type: ActionTypes.EDIT_TEAM,
        payload: team
    });

    return team;
};
