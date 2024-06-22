
import * as ActionTypes from './actionTypes'
import * as AuthSelectors from './selectors'
import * as UserActions from '../user/actions'
import Auth0Service from 'services/auth0'

export const login =
    (params, nextRoute = '/') =>
    dispatch => {
        dispatch({
            type: ActionTypes.SET_NEXT_ROUTE,
            payload: nextRoute,
        })
        console.log('loggin in with', params)
        Auth0Service.authorize(params)
    }

export const pushNextRoute = () => (dispatch, getState) => {
    const nextRoute = AuthSelectors.getNextRoute(getState())

    dispatch({
        type: ActionTypes.RESET_NEXT_ROUTE,
    })

    dispatch(push(nextRoute))
}

export const logout = () => dispatch => {
    Auth0Service.logout()
}

export const clearSession = () => dispatch => {
    dispatch({
        type: ActionTypes.CLEAR_SESSION,
    })
}

export const setSession = authResult => dispatch => {
    dispatch({
        type: ActionTypes.SET_SESSION,
        payload: {
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            idTokenPayload: authResult.idTokenPayload,
            expiresAt: authResult.expiresIn * 1000 + new Date().getTime(),
        },
    })
}

export const renewSession = () => dispatch => {
    return Auth0Service.checkSession()
        .then(authResult => {
            dispatch(setSession(authResult))
            dispatch(UserActions.updateUserProfile(authResult.idToken))
        })
        .catch(err => {
            console.log('error in renewSession')
            dispatch(logout())
        })
}

export const handleAuthentication = () => async dispatch => {
    return Auth0Service.parseHash()
        .then(authResult => {
            dispatch(setSession(authResult))
            return authResult.idToken
        })
        .catch(err => {
            return Promise.reject(err)
        })
}
