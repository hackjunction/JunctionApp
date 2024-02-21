import React from 'react'

import { useSelector } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import * as AuthSelectors from 'redux/auth/selectors'

import EventCardSmall from 'components/events/EventCardSmall'
import PageWrapper from 'components/layouts/PageWrapper'

import { useRegistrationsByUser } from 'graphql/queries/registrations'
import { useTranslation } from 'react-i18next'

export default () => {
    const userId = useSelector(AuthSelectors.getUserId)
    const [registrations = [], loading, error] = useRegistrationsByUser(userId)
    const { t } = useTranslation()
    const dispatch = useDispatch()

    //TODO Erin had designs for the redesign. Follow it
    return (
        <PageWrapper loading={loading} error={Boolean(error)}>
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
        </PageWrapper>
    )
}
