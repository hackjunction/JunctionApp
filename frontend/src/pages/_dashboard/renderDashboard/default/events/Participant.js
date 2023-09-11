import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useSelector } from 'react-redux'
import { useRegistrationsByUser } from 'graphql/queries/registrations'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@material-ui/core'

//import { useActiveEvents, usePastEvents } from 'graphql/queries/events'
import PageHeader from 'components/generic/PageHeader'
import NewEventCard from 'components/events/NewEventCard'
import EventCardSmall from 'components/events/EventCardSmall'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'


import * as AuthSelectors from 'redux/auth/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as UserActions from 'redux/user/actions'



export default () => {
    const userId = useSelector(AuthSelectors.getUserId)
    const activeEvents = useSelector(DashboardSelectors.activeEvents)
    const pastEvents = useSelector(DashboardSelectors.pastEvents)
    const [registrations, loading, error] = useRegistrationsByUser(userId)
    //useSelector(UserSelectors.registrations)



    console.log("activeEvents", activeEvents)
    console.log("pastEvents", pastEvents)
    console.log("registrations", registrations)

    const dispatch = useDispatch()
    const { t } = useTranslation()
    var date = new Date()
    const isodate = date.toISOString()

    function renderEvents() {

        return (
            <>
                <PageHeader
                    heading="Your registrations"
                    subheading="You have registrated to these events"
                />

                <Box p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>

                            {registrations.length === 0 && (
                                <Typography variant="body1">
                                    {t('Looks_like_register_')}
                                </Typography>
                            )}
                        </Grid>

                        {registrations?.map(registration => (
                            <Grid key={registration.id} item xs={12} md={6}>
                                <EventCardSmall
                                    event={registration.event}
                                    handleClick={event => {
                                        dispatch(UserActions.setAccessRight('participant'))//TODO: make this a schema
                                        dispatch(push(`/dashboard/event/${event?.slug}`))
                                    }
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                <h1 >Upcoming Events</h1>

                <Box mt={3}>
                    <Grid container spacing={3}>
                        {activeEvents?.filter(event =>
                            registrations?.map(e => e.event.slug).indexOf(event.slug) === -1
                        )
                            .map(event => {
                                const canApply =
                                    isodate < event.registrationEndTime &&
                                    isodate > event.registrationStartTime

                                const eventStarted = isodate > event.startTime
                                console.log("button render", event.slug, canApply && !event.galleryOpen, event.galleryOpen && eventStarted)
                                return (
                                    <NewEventCard
                                        event={event}
                                        buttons={[
                                            (
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        dispatch(push('/events/' + event.slug))
                                                    }
                                                >
                                                    {t('See_more_')}
                                                </Button>
                                            ),
                                            canApply && (
                                                <Button
                                                    size="small"
                                                    onClick={() =>
                                                        dispatch(
                                                            push(
                                                                '/events/' +
                                                                event.slug +
                                                                '/register/',
                                                            ),
                                                        )
                                                    }
                                                >
                                                    Register
                                                </Button>
                                            ),
                                            event.galleryOpen && eventStarted && (
                                                <Button
                                                    size="small"
                                                    onClick={() => {
                                                        console.log('/projects/' + event.slug)
                                                        dispatch(
                                                            push('/projects/' + event.slug),
                                                        )
                                                    }
                                                    }
                                                >
                                                    Projects
                                                </Button>
                                            ),






                                        ]}
                                    />)
                            }
                            )
                        }
                    </Grid>
                </Box >

                <h1 >Past Events</h1>

                <Box mt={3}>
                    <Grid container spacing={3}>
                        {pastEvents?.map(event => {
                            const canApply =
                                isodate < event.registrationEndTime &&
                                isodate > event.registrationStartTime

                            const eventStarted = isodate > event.startTime
                            return (
                                <NewEventCard
                                    event={event}
                                    buttons={[
                                        (
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    dispatch(push('/events/' + event.slug))
                                                }
                                            >
                                                {t('See_more_')}
                                            </Button>
                                        ),

                                        event.galleryOpen && eventStarted && (
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    console.log('/projects/' + event.slug)
                                                    dispatch(
                                                        push('/projects/' + event.slug),
                                                    )
                                                }
                                                }
                                            >
                                                Projects
                                            </Button>
                                        ),
                                    ]}
                                />)
                        }
                        )
                        }
                    </Grid>
                </Box >

                <Box textAlign="center" padding={5}>
                    <Button
                        variant="containedNew"
                        color="theme_black"
                        onClick={() => dispatch(push('/events'))} // TODO: Add past events page, fix the looks of this button
                    >
                        {t('Past_events_all_')}
                    </Button>
                </Box>
            </>
        )
    }

    return (
        <PageWrapper
            loading={loading}
            render={() => (
                <Container center>
                    {renderEvents()}
                </Container>
            )
            }
        />
    )
}