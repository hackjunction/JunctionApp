import React, { useContext } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useRouteMatch, useLocation } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import EventDetail from './default'
import EventRegister from './register'

import EventDetailContext, { EventDetailProvider } from './context'

const EventDetailRouter = () => {
    const match = useRouteMatch()
    const location = useLocation()
    const { eventLoading, eventError, isRegistrationOpen } = useContext(
        EventDetailContext
    )
    //TODO FIX errortext and desc to be from eventErro
    return (
        <PageWrapper
            loading={eventLoading}
            error={!!eventError}
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
                                component={EventDetail}
                            />
                            {isRegistrationOpen && (
                                <Route
                                    exact
                                    path={`${match.url}/register`}
                                    component={EventRegister}
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

export default () => {
    return (
        <EventDetailProvider>
            <EventDetailRouter />
        </EventDetailProvider>
    )
}
