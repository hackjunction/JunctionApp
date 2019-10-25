import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import { buildFilterArray } from './helpers';

import RecruitmentService from 'services/recruitment';

export const setFilters = data => dispatch => {
  dispatch({
    type: ActionTypes.SET_FILTERS,
    payload: data
  });
};

export const setPageSize = size => ({
  type: ActionTypes.SET_PAGE_SIZE,
  payload: size
});

export const setPage = page => ({
  type: ActionTypes.SET_PAGE,
  payload: page
});

export const setPrevPage = () => ({
  type: ActionTypes.SET_PREV_PAGE
});

export const setNextPage = () => ({
  type: ActionTypes.SET_NEXT_PAGE
});

export const updateSearchResults = () => (dispatch, getState) => {
  const state = getState();
  const idToken = AuthSelectors.getIdToken(state);
  const page = RecruitmentSelectors.page(state);
  const pageSize = RecruitmentSelectors.pageSize(state);
  const filters = buildFilterArray(RecruitmentSelectors.filters(state));

  dispatch({
    type: ActionTypes.UPDATE_SEARCH_RESULTS,
    promise: RecruitmentService.search(idToken, filters, page, pageSize),
    meta: {
      onFailure: e => console.log('Error getting search results', e)
    }
  });
};

export const sendMessage = (message, userId) => (getState, dispatch) => {
  const idToken = AuthSelectors.getIdToken(getState());

  dispatch({
    type: ActionTypes.SUBMIT_ACTION,
    promise: RecruitmentService.submitAction(
      'message',
      idToken,
      userId,
      message
    ),
    meta: {
      onFailure: e => console.log('Error sending message', e)
    }
  });
};

export const toggleFavorite = userId => (dispatch, getState) => {
  const idToken = AuthSelectors.getIdToken(getState());

  dispatch({
    type: ActionTypes.SUBMIT_ACTION,
    promise: RecruitmentService.submitAction('favorite', idToken, userId),
    meta: {
      onFailure: e => console.log('Error adding to favorites', e)
    }
  });
};
