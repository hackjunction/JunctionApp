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
import { useTranslation } from 'react-i18next'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const voteCount = useSelector(DashboardSelectors.annotatorVoteCount)
    const { t } = useTranslation()

    useEffect(() => {
        if (event) {
            dispatch(DashboardActions.updateAnnotator(event.slug))
        }
    }, [event, dispatch])
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

    if (!EventHelpers.isReviewingOpen(event, moment)) return null

    return (
        // <Grid item xs={12}>
        <GradientBox p={3} color="theme_purple">
            <Typography variant="button">{t('Reviewing_is_open_')}</Typography>
            <Typography variant="h6" gutterBottom>
                {t('Reviewing_end_time_', {
                    reviewing_end_time: moment(
                        event.reviewingEndTime,
                    ).fromNow(),
                })}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {t('Reviewing_open_message_gavel_review_')}
            </Typography>
            <Box mt={2}></Box>
            <Button
                onClick={() =>
                    dispatch(push(`/dashboard/event/${event.slug}/reviewing`))
                }
                color="theme_white"
                variant="contained"
            >
                {t('To_reviewing_page_')}
            </Button>
        </GradientBox>
        // </Grid>
    )
}
