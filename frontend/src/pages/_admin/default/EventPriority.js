import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import { Grid, Box, Typography } from '@material-ui/core'
import EventCardSmall from 'components/events/EventCardSmall'
import Divider from 'components/generic/Divider'

import { useTranslation } from 'react-i18next'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import EditIcon from '@material-ui/icons/Edit'

import EventService from 'services/events'
import * as AuthSelectors from 'redux/auth/selectors'

export default ({ data = [] }) => {
    const dispatch = useDispatch()
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
        [events, idToken],
    )

    return (
        <Box mt={3}>
            <Typography variant="h6" gutterBottom>
                {t('event_priority_')}
            </Typography>
            <Grid container spacing={3}>
                {events.map(event => (
                    <>
                        <Box p={2}>
                            {event.slug}
                            <button onClick={() => handleClick(event, 1)}>
                                +
                            </button>
                            {event.frontPagePriority}
                            <button onClick={() => handleClick(event, -1)}>
                                -
                            </button>
                        </Box>
                        <Divider variant="middle" />
                    </>
                ))}
            </Grid>
        </Box>
    )
}
