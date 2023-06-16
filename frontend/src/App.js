import React, { useState, useEffect, Suspense } from 'react'

import { ConnectedRouter } from 'connected-react-router'
import { useDispatch, useSelector } from 'react-redux'
import { ApolloProvider } from '@apollo/client'

import { Route, Redirect, Switch } from 'react-router-dom'
import routeConfig from './routes'
import apolloClient from './graphql/client'
import config from 'constants/config'
import * as AuthSelectors from 'redux/auth/selectors'
import * as AuthActions from 'redux/auth/actions'
import AnalyticsService from 'services/analytics'
import { getCookieConsentValue } from 'react-cookie-consent'
import CookieConsentBar from 'components/layouts/CookieConsentBar'

export default ({ history, location }) => {
    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const isSessionExpired = useSelector(AuthSelectors.isSessionExpired)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (getCookieConsentValue() === 'true') {
            AnalyticsService.init()
            AnalyticsService.pageView(window.location)
            const unlisten = history.listen(AnalyticsService.pageView)
            return () => {
                unlisten()
            }
        }
    }, [location, history])

    useEffect(() => {
        if (isAuthenticated) {
            if (isSessionExpired) {
                setLoading(true)
                console.log('renewing session now')
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
        <ApolloProvider client={apolloClient(idToken)}>
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
                            <title>{config.PLATFORM_OWNER_NAME}</title>
                            <meta
                                name="keywords"
                                content="Hackathon, hackathon platform, Junction"
                            />
                            <meta
                                name="title"
                                content={config.SEO_PAGE_TITLE}
                            />
                            <meta
                                property="og:title"
                                content={config.SEO_PAGE_TITLE}
                            />

                            <meta
                                name="twitter:title"
                                content={config.SEO_PAGE_TITLE}
                            />
                            <meta
                                name="description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />
                            <meta
                                property="og:description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />
                            <meta
                                name="twitter:description"
                                content={config.SEO_PAGE_DESCRIPTION}
                            />

                            <meta name="og:type" content="website" />
                            <meta
                                property="og:image"
                                content={config.SEO_IMAGE_URL}
                            />
                            <meta
                                name="twitter:image"
                                content={config.SEO_IMAGE_URL}
                            />
                            <meta property="og:image:width" content="1200" />
                            <meta property="og:image:height" content="630" />
                            <meta
                                name="twitter:card"
                                content="summary_large_image"
                            />
                            <meta
                                name="twitter:site"
                                content={config.SEO_TWITTER_HANDLE}
                            />
                            <meta
                                name="twitter:creator"
                                content={config.SEO_TWITTER_HANDLE}
                            />
                            <script
                                type="text/javascript"
                                async
                                src="https://platform.twitter.com/widgets.js"
                            ></script>
                            <Redirect to="/" />
                        </Switch>
                    )}
                </Suspense>
            </ConnectedRouter>
            <CookieConsentBar />
        </ApolloProvider>
    )
}
