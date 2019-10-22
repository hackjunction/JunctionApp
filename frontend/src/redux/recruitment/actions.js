import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';

import RecruitmentService from 'services/recruitment';

export const updateSearchResults = () => (dispatch, getState) => {
  const idToken = AuthSelectors.getIdToken(getState());

  dispatch({
    type: ActionTypes.UPDATE_SEARCH_RESULTS,
    promise: RecruitmentService.search(idToken),
    meta: {
      onFailure: e => console.log('Error getting search results', e)
    }
  });
};

export const sendMessage = (organization, message, recruiter, userId) => (
  dispatch,
  getState
) => {
  const idToken = AuthSelectors.getIdToken(getState());

  dispatch({
    type: ActionTypes.SUBMIT_ACTION,
    promise: RecruitmentService.submitAction(
      'message',
      idToken,
      recruiter,
      userId,
      organization,
      message
    ),
    meta: {
      onFailure: e => console.log('Error sending message', e)
    }
  });
};

export const toggleFavorite = (organization, recruiter, userId) => (
  dispatch,
  getState
) => {
  const idToken = AuthSelectors.getIdToken(getState());

  dispatch({
    type: ActionTypes.SUBMIT_ACTION,
    promise: RecruitmentService.submitAction(
      'favorite',
      idToken,
      recruiter,
      userId,
      organization
    ),
    meta: {
      onFailure: e => console.log('Error adding to favorites', e)
    }
  });
};
