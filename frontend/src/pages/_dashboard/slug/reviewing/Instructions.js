import React, { useCallback, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import Countdown from 'react-countdown-now'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import PageHeader from 'components/generic/PageHeader'
import Markdown from 'components/generic/Markdown'
import Button from 'components/generic/Button'

//import instructionsPhysical from './instructions-physical.md'
import instructionsOnline from './instructions-online.md'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const [loading, setLoading] = useState(false)
    const [instructions, setInstructions] = useState('')

    useEffect(() => {
        // const path =
        //     event.eventType === 'physical'
        //         ? instructionsPhysical
        //         : instructionsOnline
        const path = instructionsOnline
        fetch(path)
            .then(response => response.text())
            .then(text => {
                setInstructions(text)
            })
    }, [event.eventType])

    const handleBegin = useCallback(async () => {
        setLoading(true)
        const error = await dispatch(DashboardActions.beginVoting(event.slug))
        if (error) {
            dispatch(SnackbarActions.error('Oops, something went wrong...'))
        }
        setLoading(false)
    }, [dispatch, event.slug])

    return (
        <Box>
            <PageHeader heading="Reviewing" />
            <Markdown source={instructions} />
            <Box display="flex" flexDirection="column" alignItems="center">
                <Countdown
                    daysInHours
                    date={event.reviewingStartTime}
                    renderer={({ formatted, completed }) => {
                        if (completed) {
                            return (
                                <Countdown
                                    daysInHours
                                    date={event.reviewingEndTime}
                                    renderer={({ formatted, completed }) => {
                                        if (!completed) {
                                            return (
                                                <>
                                                    <Typography
                                                        variant="subtitle1"
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                        gutterBottom
                                                    >
                                                        The reviewing period is
                                                        open! Time left:{' '}
                                                        {formatted.hours}:
                                                        {formatted.minutes}:
                                                        {formatted.seconds}
                                                    </Typography>
                                                    <Button
                                                        onClick={handleBegin}
                                                        color="theme_turquoise"
                                                        variant="contained"
                                                        loading={loading}
                                                    >
                                                        Start reviewing
                                                    </Button>
                                                </>
                                            )
                                        } else {
                                            return (
                                                <Typography
                                                    variant="subtitle1"
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                    gutterBottom
                                                >
                                                    The reviewing period is
                                                    over! Thanks for
                                                    participating!
                                                </Typography>
                                            )
                                        }
                                    }}
                                />
                            )
                        } else {
                            return (
                                <>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ fontWeight: 'bold' }}
                                    >
                                        The reviewing period begins in{' '}
                                        {formatted.hours}:{formatted.minutes}:
                                        {formatted.seconds}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        paragraph
                                        gutterBottom
                                    >
                                        Come back here then!
                                    </Typography>
                                </>
                            )
                        }
                    }}
                />
            </Box>
        </Box>
    )
}
