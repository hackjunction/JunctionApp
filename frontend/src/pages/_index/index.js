import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import * as EventActions from 'redux/events/actions'
import * as EventSelectors from 'redux/events/selectors'

import BooleanInput from 'components/inputs/BooleanInput'
import Divider from 'components/generic/Divider'
import LineDivider from 'components/generic/LineDivider/'
import ExternalLink from 'components/generic/ExternalLink'
import Footer from 'components/layouts/Footer'
import PageWrapper from 'components/layouts/PageWrapper'

import EventHighlight from './EventHighlight'
import EventsGrid from './EventsGrid'
import CenteredContainer from 'components/generic/CenteredContainer'
import GlobalNavBar from 'components/navbars/GlobalNavBar'

export default () => {
    const dispatch = useDispatch()
    const upcomingJunctionEvents = useSelector(
        EventSelectors.upcomingJunctionEvents
    )
    const pastJunctionEvents = useSelector(EventSelectors.pastJunctionEvents)
    const upcomingEvents = useSelector(EventSelectors.upcomingEvents)
    const pastEvents = useSelector(EventSelectors.pastEvents)

    const [junctionCore, toggleJunctionCore] = useState(true)

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
                        <BooleanInput
                            value={junctionCore}
                            onChange={value =>
                                toggleJunctionCore(!junctionCore)
                            }
                        />
                        <EventsGrid
                            title="Upcoming / ongoing events"
                            events={
                                junctionCore
                                    ? upcomingJunctionEvents
                                    : upcomingEvents
                            }
                        />
                        <EventsGrid
                            title="Past events"
                            events={
                                junctionCore ? pastJunctionEvents : pastEvents
                            }
                        />
                    </CenteredContainer>
                    <Divider size={2} />
                    <CenteredContainer>
                        <LineDivider />
                        <Divider size={1} />
                        <h2>New to Junction?</h2>
                        <p>
                            More info about Junction can be found from our
                            website{' '}
                            <ExternalLink href="https://hackjunction.com">
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
