import React, { useState, useEffect, Suspense } from 'react'

import { ConnectedRouter } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'

import { Route, Redirect, Switch } from 'react-router-dom'

import routeConfig from './routes'

import * as AuthSelectors from 'redux/auth/selectors'
import * as AuthActions from 'redux/auth/actions'
import AnalyticsService from 'services/analytics'

export default ({ history, location }) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const isSessionExpired = useSelector(AuthSelectors.isSessionExpired)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        AnalyticsService.init()
        AnalyticsService.pageView(window.location)
        const unlisten = history.listen(AnalyticsService.pageView)

        return () => {
            unlisten()
        }
    }, [location, history])

    useEffect(() => {
        if (isAuthenticated) {
            if (isSessionExpired) {
                setLoading(true)
                dispatch(AuthActions.renewSession()).then(() => {
                    setLoading(false)
                })
            } else {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [dispatch, isAuthenticated, isSessionExpired])

    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={null}>
                {!loading && (
                    <Switch>
                        {routeConfig.routes.map(route => (
                            <Route key={route.path} {...route} />
                        ))}
                        {/**
                         * Miscellaneous
                         * TODO: 404 page
                         */}
                        <Redirect to="/" />
                    </Switch>
                )}
            </Suspense>
        </ConnectedRouter>
    )
}
