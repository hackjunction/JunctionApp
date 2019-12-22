import React, { useEffect } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'
import * as EventDetailActions from 'redux/eventdetail/actions'
import * as EventDetailSelectors from 'redux/eventdetail/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

import EventDetail from './default'
import EventRegister from './register'

export default () => {
    const dispatch = useDispatch()
    const match = useRouteMatch()
    const location = useLocation()
    const { slug } = match.params

    const isAuthenticated = useSelector(AuthSelectors.isAuthenticated)
    const eventLoading = useSelector(EventDetailSelectors.eventLoading)
    const eventError = useSelector(EventDetailSelectors.eventError)
    const isRegistrationOpen = useSelector(
        EventDetailSelectors.isRegistrationOpen
    )

    useEffect(() => {
        dispatch(EventDetailActions.updateEvent(slug))
        if (isAuthenticated) {
            dispatch(EventDetailActions.updateRegistration(slug))
        }
    }, [slug, isAuthenticated, dispatch])

    return (
        <PageWrapper
            loading={eventLoading}
            error={eventError}
            errorText={`Oops, something went wrong`}
            errorDesc={`Please refresh the page to try again.`}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => {
                return (
                    <AnimatePresence>
                        <Switch location={location} key={location.pathname}>
                            <Route
                                exact
                                path={`${match.url}`}
                                component={() => (
                                    <EventDetail
                                        slug={slug}
                                        match={match}
                                        location={location}
                                    />
                                )}
                            />
                            {isRegistrationOpen && (
                                <Route
                                    exact
                                    path={`${match.url}/register`}
                                    component={() => (
                                        <EventRegister slug={slug} />
                                    )}
                                />
                            )}
                            <Redirect to={`${match.url}`} />
                        </Switch>
                    </AnimatePresence>
                )
            }}
        />
    )
}
