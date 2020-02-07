import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PageWrapper from 'components/layouts/PageWrapper'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import Footer from 'components/layouts/Footer'

import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import CenteredContainer from 'components/generic/CenteredContainer'
import EventsService from 'services/events'

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
