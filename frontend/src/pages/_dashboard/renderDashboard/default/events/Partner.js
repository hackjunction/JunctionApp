import React from 'react'
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

import { Box, Grid } from '@material-ui/core'

export default () => {
    const userId = useSelector(AuthSelectors.getUserId)
    const activeEvents = useSelector(DashboardSelectors.activeEvents)
    const pastEvents = useSelector(DashboardSelectors.pastEvents)
    const [registrations, loading, error] = useRegistrationsByUser(userId)

    console.log("activeEvents", activeEvents)
    console.log("pastEvents", pastEvents)
    console.log("registrations", registrations)

    const dispatch = useDispatch()
    const { t } = useTranslation()

    function renderEvents() {
        return (
            <>
                <PageHeader
                    heading="Your Partner Events"
                    subheading="You have a partner status in these events"
                />

                <Box mt={3}>
                    <Grid container spacing={3}>
                        {registrations?.map(registration => {//TODO: fiter current event away

                            return (
                                <NewEventCard
                                    event={registration.event}
                                    buttons={[

                                        <Button
                                            size="small"
                                            onClick={() =>
                                                dispatch(push('/events/' + registration.event.slug))
                                            }
                                        >
                                            {t('See_more_')}
                                        </Button>,

                                        <Button
                                            size="small"
                                            onClick={() => {
                                                console.log('/dashboard/event/' + registration.event.slug)
                                                dispatch(UserActions.setAccessRight('partner'))
                                                dispatch(push(`/dashboard/event/${registration.event?.slug}`))
                                            }
                                            }
                                        >
                                            {t('Dashboard_')}
                                        </Button>,
                                    ]}
                                />)
                        })}
                    </Grid>
                </Box >
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