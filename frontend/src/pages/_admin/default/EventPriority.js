import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Grid2 as Grid, Box, Typography, IconButton } from '@mui/material'
import AddCircle from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { useTranslation } from 'react-i18next'

import EventService from 'services/events'
import * as AuthSelectors from 'reducers/auth/selectors'

export default ({ data = [] }) => {
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [events, setEvents] = useState(data)
    //TODO add state for counter component

    useEffect(() => {
        EventService.getPublicEvents().then(e => {
            if (e) setEvents(e)
        })
    }, [])

    const handleClick = useCallback(
        (event, i) => {
            EventService.setFrontpagePriority(
                idToken,
                event.slug,
                event.frontPagePriority + i,
            )
        },
        [idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('event_priority_')}
            </Typography>
            <Grid container spacing={3} sx={{ p: 2 }}>
                {events.map(event => (
                    <Grid key={event.slug}>
                        {event.slug}
                        <IconButton onClick={() => handleClick(event, 1)}>
                            <AddCircle />
                        </IconButton>
                        {event.frontPagePriority}
                        <IconButton onClick={() => handleClick(event, -1)}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
