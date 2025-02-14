import React, { useState, useEffect, Suspense } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import routeConfig from './routes'
import apolloClient from './graphql/client'
// import config from 'constants/config'
import * as AuthSelectors from 'reducers/auth/selectors'
import * as AuthActions from 'reducers/auth/actions'
// import AnalyticsService from 'services/analytics'
// import { getCookieConsentValue } from 'react-cookie-consent'
import CookieConsentBar from 'components/layouts/CookieConsentBar'
import * as SnackbarActions from 'reducers/snackbar/actions'
// import HomePage from './pages/_home/index'

export default ({ location }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const isSessionExpired = useSelector(AuthSelectors.isSessionExpired)
    const [loading, setLoading] = useState(true)

    //TODO rework analytics to use posthog
    // useEffect(() => {
    //     if (getCookieConsentValue() === 'true') {
    //         AnalyticsService.init()
    //         AnalyticsService.pageView(window.location)
    //         /**
    //          const unlisten = history.listen(AnalyticsService.pageView)
    //          return () => {
    //             unlisten()
    //             }
    //             */
    //     }
    // }, [location])

    useEffect(() => {
        setLoading(false)
        if (isAuthenticated && isSessionExpired) {
            setLoading(true)
            console.log('renewing session now')
            try {
                dispatch(AuthActions.renewSession())
            } catch (err) {
                console.log(err)
                dispatch(SnackbarActions.error('Please, log in again'))
            } finally {
                setLoading(false)
            }
        }
    }, [dispatch, isAuthenticated, isSessionExpired])

    return (
        <ApolloProvider
            client={
                apolloClient(
                    idToken,
                ) /*TODO: fails to fetch when renewing session causing a loop. fix! */
            }
        >
            <Suspense fallback={null}>
                {!loading && (
                    <BrowserRouter>
                        <Routes>
                            {routeConfig.routes.map(route => (
                                <Route key={route.path} {...route} />
                            ))}
                        </Routes>
                    </BrowserRouter>
                )}
            </Suspense>
            <CookieConsentBar />
        </ApolloProvider>
    )
}
