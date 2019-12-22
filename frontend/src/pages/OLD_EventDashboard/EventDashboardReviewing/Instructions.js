import React, { useCallback, useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import Countdown from 'react-countdown-now'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import PageHeader from 'components/generic/PageHeader'
import Markdown from 'components/generic/Markdown'
import Button from 'components/generic/Button'
import { withSnackbar } from 'notistack'

import instructionsPhysical from './instructions-physical.md'
import instructionsOnline from './instructions-online.md'

const ReviewingInstructions = ({ event, beginVoting, enqueueSnackbar }) => {
    const [loading, setLoading] = useState(false)
    const [instructions, setInstructions] = useState('')

    useEffect(() => {
        const path =
            event.eventType === 'physical'
                ? instructionsPhysical
                : instructionsOnline
        fetch(path)
            .then(response => response.text())
            .then(text => {
                setInstructions(text)
            })
    }, [event.eventType])

    const handleBegin = useCallback(async () => {
        setLoading(true)
        const error = await beginVoting(event.slug)
        if (error) {
            enqueueSnackbar('Oops, something went wrong...', {
                variant: 'error',
            })
        }
        setLoading(false)
    }, [event.slug, beginVoting, enqueueSnackbar])

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
                                                <React.Fragment>
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
                                                </React.Fragment>
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
                                <React.Fragment>
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
                                </React.Fragment>
                            )
                        }
                    }}
                />
            </Box>
        </Box>
    )
}

const mapState = state => ({
    event: DashboardSelectors.event(state),
})

const mapDispatch = dispatch => ({
    beginVoting: slug => dispatch(DashboardActions.beginVoting(slug)),
})

export default withSnackbar(
    connect(mapState, mapDispatch)(ReviewingInstructions)
)
