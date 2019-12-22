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

export default () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const idToken = useSelector(AuthSelectors.getIdToken)

    const updateEvents = useCallback(() => {
        setLoading(true)
        EventsService.getEventsByOrganiser(idToken)
            .then(data => {
                setEvents(data)
            })
            .catch(e => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Unable to get events'
                    )
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [idToken, dispatch])

    useEffect(() => {
        updateEvents()
    }, [updateEvents])

    return (
        <PageWrapper
            loading={loading}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <CenteredContainer>
                    <NewEventForm events={events} />
                    <EventsList events={events} />
                </CenteredContainer>
            )}
        />
    )
}
