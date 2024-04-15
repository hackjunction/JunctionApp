import React, { useContext, useEffect, useState } from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useRouteMatch, useLocation } from 'react-router'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import EventFooter from 'components/layouts/EventFooter'

import EventDetail from './default'
import EventRegister from './register'
import FinalistVoting from './voteWithToken'
import EventDetailContext, { EventDetailProvider } from './context'

const EventDetailRouter = () => {
    const match = useRouteMatch()
    const location = useLocation()
    const [isPreview, setIsPreview] = useState(false)
    const { eventLoading, eventError, isRegistrationOpen } = useContext(EventDetailContext)

    // Monitor changes to the preview query parameter and update state accordingly
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        setIsPreview(searchParams.get('preview') === 'true')
    }, [location.search])

    // Conditional rendering for preview or non-preview mode
    return (
        <PageWrapper
            loading={eventLoading}
            error={!!eventError}
            errorText="Oops, something went wrong"
            errorDesc="Please refresh the page to try again."
            header={!isPreview ? () => <GlobalNavBar /> : undefined}
            footer={!isPreview ? () => <EventFooter /> : undefined}
            render={() => (
                <AnimatePresence>
                    <Switch location={location} key={location.pathname}>
                        <Route
                            exact
                            path={`${match.url}`}
                            render={(props) => <EventDetail {...props} isPreview={isPreview} />}
                        />
                        {isRegistrationOpen && !isPreview &&
                            <Route exact path={`${match.url}/register`} component={EventRegister} />
                        }
                        {!isPreview &&
                            <Route exact path={`${match.url}/finalist-voting`} component={FinalistVoting} />
                        }
                        <Redirect to={`${match.url}`} />
                    </Switch>
                </AnimatePresence>
            )}
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