import React, { useEffect, useContext } from 'react'

import { Grid, Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'
import EventButtons from './EventButtons'

import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'

import EventDetailContext from '../context'

export default () => {
    const dispatch = useDispatch()
    const { slug, event, registration } = useContext(EventDetailContext)
    useEffect(() => {
        if (slug) {
            AnalyticsService.events.VIEW_EVENT(slug)
        }
    }, [slug])

    return (
        <>
            <EventHeroImage event={event} onBack={() => dispatch(push('/'))} />
            <FadeInWrapper>
                <CenteredContainer>
                    <StaggeredList>
                        <Grid container spacing={5} wrap="wrap-reverse">
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Markdown source={event?.description} />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <EventButtons
                                        event={event}
                                        registration={registration}
                                    />
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </>
    )
}
