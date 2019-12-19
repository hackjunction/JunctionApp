import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, Typography } from '@material-ui/core'

import * as AccountSelectors from 'redux/account/selectors'
import * as AccountActions from 'redux/account/actions'

import EventCardSmall from 'components/events/EventCardSmall'

export default () => {
    const dispatch = useDispatch()
    const registrations = useSelector(AccountSelectors.registrations)
    useEffect(() => {
        dispatch(AccountActions.updateRegistrations())
    }, [dispatch])

    return (
        <Box p={2}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" paragraph>
                        Your registrations
                    </Typography>
                </Grid>
                {registrations.map(registration => (
                    <Grid key={registration._id} item xs={12} md={6}>
                        <EventCardSmall eventId={registration.event} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
