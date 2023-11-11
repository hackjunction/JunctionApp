import React from 'react'

import moment from 'moment-timezone'
import Countdown from 'react-countdown-now'
import { push } from 'connected-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import { RegistrationStatuses, EventHelpers } from '@hackjunction/shared'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'

import { useTranslation } from 'react-i18next'

export default () => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const project = useSelector(DashboardSelectors.projects)
    const projectLoading = useSelector(DashboardSelectors.projectsLoading)
    const isSubmissionsUpcoming = useSelector(
        DashboardSelectors.isSubmissionsUpcoming,
    )
    const isSubmissionsPast = useSelector(DashboardSelectors.isSubmissionsPast)

    if (registration?.status !== RegistrationStatuses.asObject.checkedIn.id)
        return null
    if (EventHelpers.isEventOver(event, moment)) return null
    if (projectLoading) return null

    if (isSubmissionsUpcoming) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        {t('Project_submissions_')}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {t('Project_submissions_not_open_')}
                    </Typography>
                    <Typography variant="body1">
                        {t('Project_submissions_upcoming_', {
                            submissionsStartTime: moment(
                                event.submissionsStartTime,
                            ).format('LLLL'),
                            submissionsDeadline: moment(
                                event.submissionsEndTime,
                            ).format('LLLL'),
                        })}
                    </Typography>
                </GradientBox>
            </Grid>
        )
    }

    if (isSubmissionsPast) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_white" p={3}>
                    <Typography variant="button" gutterBottom>
                        {t('Project_submissions_')}
                    </Typography>
                    <Typography variant="h4" color="secondary" gutterBottom>
                        {t('Project_submissions_closed_')}
                    </Typography>
                    <Typography variant="body1">
                        {t('Project_submissions_closed_text_')}
                    </Typography>
                </GradientBox>
            </Grid>
        )
    }

    // Project submissions are open

    if (!project) {
        return (
            <Grid item xs={12}>
                <GradientBox color="theme_orange" p={3}>
                    <Typography variant="button" gutterBottom>
                        Project submissions
                    </Typography>
                    <Typography variant="h4">
                        Project submissions are open
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        The submission deadline is in{' '}
                        <Countdown
                            daysInHours
                            date={event.submissionsEndTime}
                            renderer={({ formatted }) =>
                                `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`
                            }
                        />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        You haven't yet submitted a project! You should go and
                        submit a draft of your project as soon as you have a
                        rough idea of what you're making. You're free to edit
                        your project submission as many times as you wish until
                        the final submission deadline, and the project won't be
                        visible to others until the end. It'll take you under a
                        minute, we promise.
                    </Typography>
                    <Button
                        variant="contained"
                        color="theme_white"
                        onClick={() =>
                            dispatch(push(`/dashboard/event/${event.slug}/project`))
                        }
                    >
                        Make a draft submission
                    </Button>
                </GradientBox>
            </Grid>
        )
    }

    return (
        <Grid item xs={12}>
            <GradientBox color="primary" p={3}>
                <Typography variant="button" gutterBottom>
                    Project submissions
                </Typography>
                <Typography variant="h4">
                    Project submissions are open!
                </Typography>
                <Typography variant="h6" gutterBottom>
                    The submission deadline is in{' '}
                    <Countdown
                        daysInHours
                        date={event.submissionsEndTime}
                        renderer={({ formatted }) =>
                            `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`
                        }
                    />
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Great, you've already made a submission! You can make edits
                    to it until the final submission deadline, so make sure to
                    make it as polished as possible!
                </Typography>
                <Button
                    variant="contained"
                    color="theme_white"
                    onClick={() =>
                        dispatch(push(`/dashboard/event/${event.slug}/project`))
                    }
                >
                    Edit your submission
                </Button>
            </GradientBox>
        </Grid>
    )
}
