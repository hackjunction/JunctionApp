import React, { useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Grid2 as Grid, Box, Typography } from '@mui/material'
import EventCardSmall from 'components/events/EventCardSmall'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import EventService from 'services/events'
import * as AuthSelectors from 'reducers/auth/selectors'
import { useNavigate } from 'react-router-dom'

export default ({ data = [] }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const [events, setEvents] = useState(data)

    useEffect(() => {
        EventService.getUnapprovedEvents(idToken).then(e => {
            if (e) {
                setEvents(e)
            }
        })
    }, [idToken])

    const handleRemove = useCallback(
        slug => {
            EventService.deleteEventBySlugAsOrganiser(idToken, slug)
            setEvents(
                events.filter(function (obj) {
                    return obj.slug !== slug
                }),
            )
        },
        [events, idToken],
    )

    const handleApprove = useCallback(
        slug => {
            EventService.setApproved(idToken, slug, true)
        },
        [idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('unapproved_events_')}
            </Typography>
            <Grid container spacing={3}>
                {events.map(event =>
                    event.published ? (
                        <Box p={2} key={event.slug}>
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handleRemove(event.slug)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="Approve"
                                onClick={() => handleApprove(event.slug)}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                            <EventCardSmall
                                event={event}
                                handleClick={event =>
                                    navigate(`/organise/${event?.slug}/edit`)
                                }
                            />
                        </Box>
                    ) : null,
                )}
            </Grid>
        </Box>
    )
}
