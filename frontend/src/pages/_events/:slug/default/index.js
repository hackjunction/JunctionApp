import React, { useEffect } from 'react'

import { Grid, Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useRouteMatch, useLocation } from 'react-router'

import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'
import EventButtons from './EventButtons'

import * as EventDetailSelectors from 'redux/eventdetail/selectors'
import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'

export default () => {
    const event = useSelector(EventDetailSelectors.event)

    const match = useRouteMatch()
    const location = useLocation()

    const { slug } = event

    useEffect(() => {
        AnalyticsService.events.VIEW_EVENT(slug)
    }, [slug])

    return (
        <React.Fragment>
            <EventHeroImage event={event} />
            <FadeInWrapper>
                <CenteredContainer>
                    <StaggeredList>
                        <Grid container spacing={5} wrap="wrap-reverse">
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Markdown source={event.description} />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <EventButtons
                                        slug={slug}
                                        match={match}
                                        location={location}
                                    />
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </React.Fragment>
    )
}
