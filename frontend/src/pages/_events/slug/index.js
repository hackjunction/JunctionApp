import React, { useContext } from 'react'

import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import EventFooter from 'components/layouts/EventFooter'

import EventDetail from './default'
import EventRegister from './register'
import FinalistVoting from './voteWithToken'
import EventDetailContext, { EventDetailProvider } from './context'

const EventDetailRouter = () => {
    const { eventLoading, eventError, isRegistrationOpen } =
        useContext(EventDetailContext)
    // TODO FIX errortext and desc to be from eventErro
    return (
        <PageWrapper
            loading={eventLoading}
            error={!!eventError}
            errorText={`Oops, something went wrong`}
            errorDesc={`Please refresh the page to try again.`}
            header={() => <GlobalNavBar />}
            footer={() => <EventFooter />}
            render={() => {
                return (
                    <AnimatePresence>
                        <Routes>
                            <Route index element={<EventDetail />} />
                            <Route
                                path={`/finalist-voting`}
                                element={<FinalistVoting />}
                            />
                            {isRegistrationOpen && (
                                <Route
                                    path={`/register`}
                                    element={<EventRegister />}
                                />
                            )}
                        </Routes>
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
