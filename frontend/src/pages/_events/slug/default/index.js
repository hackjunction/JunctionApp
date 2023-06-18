import React, { useEffect, useContext } from 'react'

import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import EventHeroImage from 'components/events/EventHeroImage'
import Markdown from 'components/generic/Markdown'
import AnalyticsService from 'services/analytics'

import EventTimeline from './EventTimeline'
import BannerCarousel from 'components/generic/BannerCarousel'
import EventInformation from './EventInformation'

import StaggeredList from 'components/animated/StaggeredList'
import StaggeredListItem from 'components/animated/StaggeredListItem'
import FadeInWrapper from 'components/animated/FadeInWrapper'
import Container from 'components/generic/Container'
import { Helmet } from 'react-helmet'
import EventDetailContext from '../context'
import EventPageScriptIFrame from 'components/events/EventPageScriptIFrame'
import { EventPageScripts } from '@hackjunction/shared'
import EventButtons from './EventButtons'

const useStyles = makeStyles({
    header: {
        background: props => props.headerBackgroundColor,
        color: props => props.headerTextColor,

        '& button:not(disabled)': {
            color: props => props.headerBackgroundColor,
            background: props => props.accentColor,

            '&:hover': {
                background: props => props.linkColor,
            },
        },
    },
    cta: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        margin: '20px 0 0 0',
        '& button': {
            margin: 0,
        },
    },
    body: {
        background: props => props.bodyBackgroundColor,
        '& a>p': {
            color: props => props.linkColor,
        },
    },
    details: {
        background: props => props.detailsBackgroundColor,
        color: props => props.detailsTextColor,

        '& *': {
            color: props => props.detailsTextColor,
        },
    },
    sidebar: {
        background: props => props.sidebarBackgroundColor,
    },
})

export default () => {
    const dispatch = useDispatch()
    const { slug, event, registration } = useContext(EventDetailContext)
    const classes = useStyles(event.theme)

    const keywords = event.name.split(' ').join(', ')

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
            <EventHeroImage
                event={event}
                onBack={() => dispatch(goBack())}
                alignRight
                backgroundColor={event.theme.headerBackgroundColor}
            />
            <FadeInWrapper>
                <StaggeredList>
                    <Box className={classes.header}>
                        <Container>
                            <Grid container spacing={5}>
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    className={classes.header}
                                >
                                    <Box mt={3} />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={8}
                                    className={classes.header}
                                >
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
                        </Container>
                    </Box>
                    <Box className={classes.body}>
                        <Container>
                            <Grid container spacing={5} wrap="wrap-reverse">
                                <Grid
                                    item
                                    xs={12}
                                    md={4}
                                    className={classes.sidebar}
                                >
                                    <Box mt={3} />
                                    <StaggeredListItem>
                                        <Box mt={3} />
                                        <EventTimeline
                                            event={event}
                                            accentColor={
                                                event.theme.accentColor
                                            }
                                            textColor={
                                                event.theme.sidebarTextColor
                                            }
                                        />
                                    </StaggeredListItem>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={8}
                                    className={classes.details}
                                >
                                    <Box mt={3} />
                                    <StaggeredListItem>
                                        <Markdown source={event?.description} />
                                    </StaggeredListItem>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <Box className={`${classes.header} ${classes.cta}`}>
                        <EventButtons
                            event={event}
                            registration={registration}
                        />
                    </Box>
                </StaggeredList>
            </FadeInWrapper>
            <BannerCarousel />
            <EventPageScriptIFrame
                slug={slug}
                pageId={EventPageScripts.PageScriptLocation.EVENT_DETAILS_PAGE}
                event={event}
            />
        </>
    )
}
