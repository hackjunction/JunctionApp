import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { useLocation } from 'react-router'

import * as AuthActions from 'redux/auth/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as UserActions from 'redux/user/actions'

import LoadingOverlay from 'components/loaders/LoadingOverlay'
import AnalyticsService from 'services/analytics'

export default () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const idToken = useSelector(AuthSelectors.getIdToken)

    const getOrCreateProfile = useCallback(async () => {
        if (idToken) {
            try {
                const userProfile = await dispatch(
                    UserActions.updateUserProfile(idToken),
                )
                if (!userProfile) {
                    dispatch(push('/login/welcome'))
                } else {
                    dispatch(AuthActions.pushNextRoute())
                }
            } catch (err) {
                if (err.response.status === 404) {
                    dispatch(push('/login/welcome'))
                } else {
                    dispatch(push('/error', { error: 'Login failed' }))
                }
            }
        }
    }, [idToken, dispatch])

    const handleAuthentication = useCallback(async () => {
        if (/access_token|id_token|error/.test(location.hash)) {
            try {
                await dispatch(AuthActions.handleAuthentication())
                AnalyticsService.events.LOG_IN()
            } catch (err) {
                console.error('Login error', err)
                dispatch(push('/error', { error: err.message }))
            }
        }
    }, [dispatch, location])

    useEffect(() => {
        handleAuthentication()
    }, [handleAuthentication])

    useEffect(() => {
        getOrCreateProfile()
    }, [getOrCreateProfile])

    return <LoadingOverlay text="Signing in" />
}
