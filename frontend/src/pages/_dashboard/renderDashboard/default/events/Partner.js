import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { useSelector } from 'react-redux'
import { useRegistrationsByUser } from 'graphql/queries/registrations'

import PageHeader from 'components/generic/PageHeader'
import NewEventCard from 'components/events/NewEventCard'
import Button from 'components/generic/Button'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import { useTranslation } from 'react-i18next'
import * as AuthSelectors from 'redux/auth/selectors'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as UserActions from 'redux/user/actions'
import * as UserSelectors from 'redux/user/selectors'
import { useActiveEvents } from 'graphql/queries/events'
import * as DashboardActions from 'redux/dashboard/actions'

import { Box, Grid } from '@material-ui/core'
import _ from 'lodash'

export default () => {
    const userId = useSelector(AuthSelectors.getUserId)
    const [activeEvents, loadingActive] = useActiveEvents({})
    const pastEvents = useSelector(DashboardSelectors.pastEvents)
    const recruiterEvents = useSelector(
        UserSelectors.userProfileRecruiterEvents,
    )
    const [registrations, loading, error] = useRegistrationsByUser(userId)
    const [partnerEvents, setPartnerEvents] = useState([])

    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        const foundPartnerEvents = []

        if (
            activeEvents &&
            Array.isArray(activeEvents) &&
            activeEvents.length > 0
        ) {
            activeEvents.map(event => {
                const match = _.find(recruiterEvents, { eventId: event._id })
                if (match) {
                    foundPartnerEvents.push(event)
                }
            })
        }
        setPartnerEvents(foundPartnerEvents)
    }, [activeEvents, recruiterEvents])

    function renderEvents() {
        return (
            <>
                <PageHeader
                    heading="Your Partner Events"
                    subheading="You have a partner status in these events"
                />

                <Box mt={3}>
                    <Grid container spacing={3}>
                        {partnerEvents?.map(event => {
                            //TODO: fiter current event away

                            return (
                                <Grid key={`partner-${event._id}`} item xs={12}>
                                    <NewEventCard
                                        handleClick={() => {
                                            console.log(
                                                '/dashboard/event/' +
                                                    event.slug,
                                            )
                                            dispatch(
                                                UserActions.setAccessRight(
                                                    'partner',
                                                ),
                                            )
                                            dispatch(
                                                push(
                                                    `/dashboard/event/${event?.slug}`,
                                                ),
                                            )
                                        }}
                                        event={event}
                                        buttons={[
                                            <Button
                                                size="small"
                                                onClick={() =>
                                                    dispatch(
                                                        push(
                                                            '/events/' +
                                                                event.slug,
                                                        ),
                                                    )
                                                }
                                            >
                                                {t('See_more_')}
                                            </Button>,

                                            <Button
                                                id={`partner-dashboard-event-${event.slug}`}
                                                size="small"
                                                onClick={() => {
                                                    console.log(
                                                        '/dashboard/event/' +
                                                            event.slug,
                                                    )
                                                    dispatch(
                                                        UserActions.setAccessRight(
                                                            'partner',
                                                        ),
                                                    )
                                                    dispatch(
                                                        push(
                                                            `/dashboard/event/${event?.slug}`,
                                                        ),
                                                    )
                                                }}
                                            >
                                                {t('Dashboard_')}
                                            </Button>,
                                        ]}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </>
        )
    }

    return (
        <PageWrapper
            loading={loading}
            render={() => <Container center>{renderEvents()}</Container>}
        />
    )
}
