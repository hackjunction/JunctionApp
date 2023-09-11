import React from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useSelector } from 'react-redux'
import { useRegistrationsByUser } from 'graphql/queries/registrations'

import { useActiveEvents, usePastEvents } from 'graphql/queries/events'
import PageHeader from 'components/generic/PageHeader'
import NewEventCard from 'components/events/NewEventCard'
import EventCardSmall from 'components/events/EventCardSmall'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import EventCard2 from './EventCard'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useTranslation } from 'react-i18next'
import * as AuthSelectors from 'redux/auth/selectors'

import { Box, Grid, Typography } from '@material-ui/core'

export default () => {
    const [activeEvents, loadingActive] = useActiveEvents({})
    const [pastEvents, loadingPast] = usePastEvents({ limit: 3 })

    const userId = useSelector(AuthSelectors.getUserId)
    const [registrations = [], loadingRegistration, error] = useRegistrationsByUser(userId)

    const dispatch = useDispatch()
    const { t } = useTranslation()
    var date = new Date()
    const isodate = date.toISOString()
    console.log("registrations", registrations)

    const items = Array.from({ length: 100 }).map((_, index) => (
        <img
            key={index}
            src={`https://picsum.photos/200/${Math.floor(
                Math.random() * (300 - 200 + 1) + 200
            )}`}
            style={{ width: "100%", borderRadius: "8px" }}
        />
    ))

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
                            <Typography variant="h6" gutterBottom>
                                {t('Your_registrations_')}
                            </Typography>
                            {registrations.length === 0 && (
                                <Typography variant="body1">
                                    {t('Looks_like_register_')}
                                </Typography>
                            )}
                        </Grid>
                        {/* {registrations.length !== 0 && (registrations?.map(event => {


                            return (
                                <NewEventCard
                                    event={event}

                                    buttons={[

                                        <Button
                                            color="primary"
                                            variant="outlinedNew"
                                            strong
                                            onClick={event =>
                                                dispatch(push(`/dashboard/event/${event?.slug}`))
                                            }
                                        >
                                            {t('Dashboard_')}
                                        </Button>

                                    ]}
                                />)


                        }
                        )
                        )} */}
                        {registrations.map(registration => (
                            <Grid key={registration.id} item xs={12} md={6}>
                                <EventCardSmall
                                    event={registration.event}
                                    handleClick={event =>
                                        dispatch(push(`/dashboard/event/${event?.slug}`))
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                <h1 >Upcoming Events</h1>

                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 600: 2, 1000: 3, 1500: 4 }}
                >
                    <Masonry>
                        {activeEvents?.filter(event =>
                            registrations.map(e => e.event.slug).indexOf(event.slug) === -1
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
                    </Masonry>
                </ResponsiveMasonry>

                <h1 >Past Events</h1>

                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 600: 2, 1000: 3, 1500: 4 }}
                >
                    <Masonry>
                        {pastEvents?.map(event => {
                            console.log("organizations", event)
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
                    </Masonry>
                </ResponsiveMasonry>

                <Box textAlign="center">
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
            loading={loadingRegistration && loadingActive && loadingPast}
            render={() => (
                <Container center>
                    {renderEvents()}
                </Container>
            )
            }
        />
    )
}