import React, { useEffect, useContext } from 'react'

import { Grid, Box, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import moment from 'moment'
import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'

import EventInformation from './EventInformation'

import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import CenteredContainer from 'components/generic/CenteredContainer'
import Button from 'components/generic/Button'
import { Helmet } from 'react-helmet'
import EventDetailContext from '../context'

export default () => {
    const dispatch = useDispatch()
    const { slug, event, registration } = useContext(EventDetailContext)

    const keywords = event.name.split(' ').join(', ')
    console.log('KEYWORDS', keywords)
    console.log('HELMET', Helmet.peek())

    useEffect(() => {
        if (slug) {
            AnalyticsService.events.VIEW_EVENT(slug)
        }
    }, [slug])

    const coverImage = () => {
        if (event.coverImage !== null) return event.coverImage.url
        else return '%REACT_APP_SEO_IMAGE_URL%'
    }

    const eventDescription = () => {
        return `${event.name} is coming up! If you're interested in joining the coolest hackathon on the planet just head straight to ...`
    }
    console.log('event :>> ', event)
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{event.name}</title>
                <meta name="keywords" content={keywords} />
                <meta name="title" content={event.name} />
                <meta property="og:title" content={event.name} />
                <meta name="twitter:title" content={event.name} />
                <meta
                    name="description"
                    content={
                        event.metaDescription !== null
                            ? event.metaDescription
                            : eventDescription()
                    }
                />
                <meta
                    property="og:description"
                    content={
                        event.metaDescription !== null
                            ? event.metaDescription
                            : eventDescription()
                    }
                />
                <meta
                    name="twitter:description"
                    content={
                        event.metaDescription !== null
                            ? event.metaDescription
                            : eventDescription()
                    }
                />

                <meta name="og:type" content="website" />
                <meta property="og:image" content={coverImage()} />
                <meta name="twitter:image" content={coverImage()} />
            </Helmet>
            <EventHeroImage event={event} onBack={() => dispatch(push('/'))} />
            <FadeInWrapper>
                <CenteredContainer>
                    <StaggeredList>
                        <Grid container spacing={5} wrap="wrap-reverse">
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Box mt={3} />
                                    <EventTimeline event={event} />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />
                                <StaggeredListItem>
                                    <Markdown source={event?.description} />
                                </StaggeredListItem>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Box mt={3} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box mt={3} />

                                <Typography variant="h2">
                                    {event.name}
                                </Typography>
                                <Grid container justify="space-between">
                                    <EventInformation
                                        registration={registration}
                                        event={event}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </StaggeredList>
                </CenteredContainer>
            </FadeInWrapper>
        </>
    )
}
