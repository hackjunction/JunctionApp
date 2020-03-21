import React from 'react'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import CenteredContainer from 'components/generic/CenteredContainer'

import NewEventForm from './NewEventForm'
import EventsList from './EventsList'

import { useMyEvents } from 'graphql/queries/events'

export default () => {
    const [events, loading] = useMyEvents()

    return (
        <PageWrapper
            loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer>
                    <NewEventForm />
                    <EventsList events={events} />
                </CenteredContainer>
            )}
        />
    )
}
