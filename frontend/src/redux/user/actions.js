import * as ActionTypes from './actionTypes';

export const setUserProfile = profile => dispatch => {
    dispatch({
        type: ActionTypes.SET_PROFILE,
        payload: profile
    });
};

export const setRegistration = (registration, eventId) => dispatch => {
    dispatch({
        type: ActionTypes.SET_REGISTRATION,
        payload: {
            registration,
            eventId
        }
    });
};

// export const getUserProfile = () => (dispatch, getState) => {
//     const state = getState();
//     const idToken = AuthSelectors.getIdToken(state);

//     dispatch({
//         type: ActionTypes.UPDATE_PROFILE,
//         promise: UserProfilesService.getUserProfile(idToken),
//         meta: {
//             onFailure: e => console.log('Failed to get user profile', e)
//         }
//     });
// };

// export const updateUserProfile = data => (dispatch, getState) => {
//     const state = getState();
//     const idToken = AuthSelectors.getIdToken(state);

//     dispatch({
//         type: ActionTypes.UPDATE_PROFILE,
//         promise: UserProfilesService.updateUserProfile(data, idToken),
//         meta: {
//             onFailure: e => console.log('Failed to update user profile', e)
//         }
//     });
// };

// export const createUserProfile = data => (dispatch, getState) => {
//     const state = getState();
//     const idToken = AuthSelectors.getIdToken(state);

//     dispatch({
//         type: ActionTypes.UPDATE_PROFILE,
//         promise: UserProfilesService.createUserProfile(data, idToken),
//         meta: {
//             onFailure: e => console.log('Failed to create user profile', e)
//         }
//     });
// };
