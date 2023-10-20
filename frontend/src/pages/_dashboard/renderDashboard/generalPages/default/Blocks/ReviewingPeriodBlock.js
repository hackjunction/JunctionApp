import React, { useEffect } from 'react'

import { Typography, Grid, Box } from '@material-ui/core'
import { push } from 'connected-react-router'
import moment from 'moment-timezone'
import { useDispatch, useSelector } from 'react-redux'
import { EventHelpers } from '@hackjunction/shared'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const voteCount = useSelector(DashboardSelectors.annotatorVoteCount)

    useEffect(() => {
        if (event) {
            dispatch(DashboardActions.updateAnnotator(event.slug))
        }
    }, [event, dispatch])
    if (event.reviewMethod === 'manualReview' && EventHelpers.isVotingOpen(event, moment)) return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button">Reviewing period</Typography>
                <Typography variant="h4">Reviewing period is open!</Typography>
                <Typography variant="h6" gutterBottom>
                    Reviewing ends {moment(event.reviewingEndTime).fromNow()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Sit back and relax while we review your project!
                </Typography>
                <Box mt={2}></Box>
            </GradientBox>
        </Grid>
    )

    if (!EventHelpers.isVotingOpen(event, moment)) return null

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button">Reviewing period</Typography>
                <Typography variant="h4">Reviewing period is open!</Typography>
                <Typography variant="h6" gutterBottom>
                    Reviewing ends {moment(event.reviewingEndTime).fromNow()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {voteCount === 0
                        ? `Head over to the reviewing page to start reviewing other projects!`
                        : `You've submitted ${voteCount} votes. Head over to the reviewing page to continue reviewing other projects!`}
                </Typography>
                <Box mt={2}></Box>
                <Button
                    onClick={() =>
                        dispatch(push(`/dashboard/event/${event.slug}/reviewing`))
                    }
                    color="theme_white"
                    variant="contained"
                >
                    To reviewing
                </Button>
            </GradientBox>
        </Grid>
    )
}
