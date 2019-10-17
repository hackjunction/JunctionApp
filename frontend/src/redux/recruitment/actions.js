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
