import React, { useEffect } from 'react'

import { Typography, Grid, Box } from '@mui/material'

import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { EventHelpers } from '@hackjunction/shared'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'
import * as DashboardSelectors from 'reducers/dashboard/selectors'
import { useNavigate } from 'react-router-dom'
// import * as DashboardActions from 'reducers/dashboard/actions'
import { useTranslation } from 'react-i18next'

export default () => {
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const event = useSelector(DashboardSelectors.event)
    // const voteCount = useSelector(DashboardSelectors.annotatorVoteCount)
    const { t } = useTranslation()

    // useEffect(() => {
    //     if (event) {
    //         dispatch(DashboardActions.updateAnnotator(event.slug))
    //     }
    // }, [event, dispatch])
    if (!EventHelpers.isReviewingOpen(event, moment)) return null
    if (
        event.reviewMethod === 'manualReview' &&
        EventHelpers.isReviewingOpen(event, moment)
    )
        return (
            // <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button">
                    {t('Reviewing_is_open_')}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {t('Reviewing_end_time_', {
                        reviewing_end_time: moment(
                            event.reviewingEndTime,
                        ).fromNow(),
                    })}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('Reviewing_open_message_manual_review_')}
                </Typography>
                <Box mt={2}></Box>
            </GradientBox>
            // </Grid>
        )

    return (
        <Grid item xs={12}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button">Reviewing period</Typography>
                <Typography variant="h4">Reviewing period is open!</Typography>
                <Typography variant="h6" gutterBottom>
                    {t('Reviewing_end_time_', {
                        reviewing_end_time: moment(
                            event.reviewingEndTime,
                        ).fromNow(),
                    })}
                </Typography>
                {/* <Typography variant="body1" gutterBottom>
                    {voteCount === 0
                    ? `Head over to the reviewing page to start reviewing other projects!`
                        : `You've submitted ${voteCount} votes. Head over to the reviewing page to continue reviewing other projects!`}
                        </Typography> */}
                <Typography variant="body1" gutterBottom>
                    {t('Reviewing_open_message_gavel_review_')}
                </Typography>
                <Box mt={2}></Box>
                <Button
                    onClick={() =>
                        navigate(`/dashboard/event/${event.slug}/reviewing`)
                    }
                    color="theme_white"
                    variant="contained"
                >
                    {t('To_reviewing_page_')}
                </Button>
            </GradientBox>
        </Grid>
    )
}
