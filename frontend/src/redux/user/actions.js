import LogRocket from 'logrocket'

import * as ActionTypes from './actionTypes'
import * as AuthSelectors from 'redux/auth/selectors'
import config from 'constants/config'
import { getCookieConsentValue } from 'react-cookie-consent'
import UserProfilesService from 'services/userProfiles'

export const setUserProfile = profile => dispatch => {
    dispatch({
        type: ActionTypes.SET_PROFILE,
        payload: profile,
    })

    /** To connect logs and crash reports with the user */
    if (
        profile?.userId &&
        config.LOGROCKET_ID &&
        getCookieConsentValue() === 'true'
    ) {
        LogRocket.init(config.LOGROCKET_ID)
        LogRocket.identify(profile.userId, {
            email: profile.email,
            name: `${profile.firstName} ${profile.lastName}`,
        })
    }
}

export const updateUserProfile = idToken => async dispatch => {
    const userProfile = await UserProfilesService.getUserProfile(idToken)

    if (userProfile) {
        dispatch(setUserProfile(userProfile))
    } else {
        dispatch(setUserProfile(null))
    }

    return userProfile
}

export const editUserProfile = data => async (dispatch, getState) => {
    const idToken = AuthSelectors.getIdToken(getState())

    const userProfile = await UserProfilesService.editUserProfile(idToken, data)

    dispatch(setUserProfile(userProfile))

    return userProfile
}

export const setRegistration = (registration, eventId) => dispatch => {
    dispatch({
        type: ActionTypes.SET_REGISTRATION,
        payload: {
            registration,
            eventId,
        },
    })
}

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
