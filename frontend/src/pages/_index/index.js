import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from 'redux/events/actions'
import * as EventSelectors from 'redux/events/selectors'

import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import EventHighlight from './EventHighlight'
import EventsGrid from './EventsGrid'
import CenteredContainer from 'components/generic/CenteredContainer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'
import config from 'constants/config'

export default () => {
    const dispatch = useDispatch()
    const upcomingEvents = useSelector(EventSelectors.upcomingEvents)
    const pastEvents = useSelector(EventSelectors.pastEvents)

    useEffect(() => {
        dispatch(EventActions.updateEvents())
    }, [dispatch])

    return (
        <PageWrapper
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => (
                <>
                    <Divider size={1} />
                    <EventHighlight />
                    <Divider size={2} />
                    <CenteredContainer>
                        <EventsGrid
                            title="Upcoming / ongoing events"
                            events={upcomingEvents}
                        />
                        <EventsGrid title="Past events" events={pastEvents} />
                    </CenteredContainer>
                    <Divider size={2} />
                    <CenteredContainer>
                        <LineDivider />
                        <Divider size={1} />
                        <h2>New to {config.PLATFORM_OWNER_NAME}?</h2>
                        <p>
                            More info about {config.PLATFORM_OWNER_NAME} can be
                            found from our website{' '}
                            <ExternalLink href={config.PLATFORM_OWNER_WEBSITE}>
                                {' '}
                                here
                            </ExternalLink>
                        </p>
                        <Divider size={5} />
                    </CenteredContainer>
                </>
            )}
        />
    )
}
