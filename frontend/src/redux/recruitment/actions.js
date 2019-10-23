import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

import RecruitmentService from 'services/recruitment';

export const setFilters = data => dispatch => {
    const { skills = [], roles = [], countries = [] } = data;

    const filters = [];

    if (countries.length) {
        filters.push({
            field: 'countryOfResidence',
            operator: '==',
            value: countries
        });
    }

    skills.forEach(({ skill, levels }) => {
        if (levels.length) {
            filters.push({
                field: 'skills',
                operator: 'array-contains',
                value: {
                    skill,
                    level: {
                        $in: levels.map(level => parseInt(level))
                    }
                }
            });
        } else {
            filters.push({
                field: 'skills.skill',
                operator: '==',
                value: skill
            });
        }
    });

    roles.forEach(({ role, years }) => {
        if (years.length) {
            filters.push({
                field: 'roles',
                operator: 'array-contains',
                value: {
                    role,
                    years: {
                        $in: years.map(year => parseInt(year))
                    }
                }
            });
        } else {
            filters.push({
                field: 'roles.role',
                operator: '==',
                value: role
            });
        }
    });

    dispatch({
        type: ActionTypes.SET_FILTERS,
        payload: filters
    });
};

export const updateSearchResults = () => (dispatch, getState) => {
    const state = getState();
    const idToken = AuthSelectors.getIdToken(state);
    const filters = RecruitmentSelectors.filters(state);

    dispatch({
        type: ActionTypes.UPDATE_SEARCH_RESULTS,
        promise: RecruitmentService.search(idToken, filters),
        meta: {
            onFailure: e => console.log('Error getting search results', e)
        }
    });
};

export const sendMessage = (organization, message, recruiter, userId) => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.SUBMIT_ACTION,
        promise: RecruitmentService.submitAction('message', idToken, recruiter, userId, organization, message),
        meta: {
            onFailure: e => console.log('Error sending message', e)
        }
    });
};

export const toggleFavorite = (organization, recruiter, userId) => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.SUBMIT_ACTION,
        promise: RecruitmentService.submitAction('favorite', idToken, recruiter, userId, organization),
        meta: {
            onFailure: e => console.log('Error adding to favorites', e)
        }
    });
};
