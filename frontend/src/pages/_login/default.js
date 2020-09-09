import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import * as AuthSelectors from 'redux/auth/selectors'
import * as AuthActions from 'redux/auth/actions'

import LoadingOverlay from 'components/loaders/LoadingOverlay'
import MiscUtils from 'utils/misc'
import { useTranslation } from 'react-i18next'

export default () => {
    const { i18n } = useTranslation()
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)

    const handleLogin = useCallback(async () => {
        const nextRoute = location?.state?.nextRoute ?? '/'
        // TODO sleep???
        await MiscUtils.sleep(1000)
        if (isAuthenticated) {
            dispatch(AuthActions.login({}, nextRoute))
        } else {
            dispatch(
                AuthActions.login(
                    { prompt: 'login', ui_locales: i18n.language },
                    nextRoute
                )
            )
        }
    }, [dispatch, i18n.language, isAuthenticated, location])

    useEffect(() => {
        handleLogin()
    }, [handleLogin])

    return <LoadingOverlay text="Authenticating" />
}
