import * as ActionTypes from './actionTypes';
import * as AuthSelectors from 'redux/auth/selectors';

import UserProfileService from 'services/userProfiles';

export const updateSearchResults = () => (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState());

    dispatch({
        type: ActionTypes.UPDATE_SEARCH_RESULTS,
        promise: UserProfileService.queryUsers(idToken),
        meta: {
            onFailure: e => console.log('Error getting search results', e)
        }
    });
};
