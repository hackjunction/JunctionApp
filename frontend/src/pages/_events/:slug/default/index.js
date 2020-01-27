import React, { useEffect } from 'react'

import { Grid, Box } from '@material-ui/core'
import { useRouteMatch, useLocation } from 'react-router'

import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'
import EventButtons from './EventButtons'

import PageWrapper from 'components/layouts/PageWrapper'
import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'

import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const eventQuery = gql`
    query Event($slug: String!) {
        eventBySlug(slug: $slug) {
            name
            description
            coverImage {
                url
                publicId
            }
            timezone
            startTime
            endTime
            registrationStartTime
            registrationEndTime

            _eventStatus
            _eventTimeFormatted
            _eventLocationFormatted
        }
    }
`

export default ({ event, loading, error }) => {
    const { slug } = event

    useEffect(() => {
        if (slug) {
            AnalyticsService.events.VIEW_EVENT(slug)
        }
    }, [slug])

    return (
        <PageWrapper loading={loading} error={error}>
            <EventHeroImage event={event} />
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
                                    <EventButtons event={event} />
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </PageWrapper>
    )
}
