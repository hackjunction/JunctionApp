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

    return (
        <Grid item xs={12}>
            <GradientBox color="primary" p={3}>
                <Typography variant="button" gutterBottom>
                    {t('Project_submissions_')}
                </Typography>
                <Typography variant="h4">
                    {t('Project_submissions_open_')}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {t('Project_submissions_deadline_countdown_text_')}
                    <Countdown
                        daysInHours
                        date={event.submissionsEndTime}
                        renderer={({ formatted }) =>
                            `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`
                        }
                    />
                </Typography>
                {project ? (
                    <>
                        <Typography variant="body1" gutterBottom>
                            {t(
                                'Project_submissions_message_if_project_submitted_',
                            )}
                        </Typography>
                        <Button
                            variant="contained"
                            color="theme_white"
                            onClick={() =>
                                dispatch(
                                    push(
                                        `/dashboard/event/${event.slug}/project`,
                                    ),
                                )
                            }
                        >
                            {t('Edit_project_')}
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="body1" gutterBottom>
                            {t(
                                'Project_submissions_message_if_no_project_submitted_',
                            )}
                        </Typography>
                        <Button
                            variant="contained"
                            color="theme_white"
                            onClick={() =>
                                dispatch(
                                    push(
                                        `/dashboard/event/${event.slug}/project`,
                                    ),
                                )
                            }
                        >
                            {t('Make_draft_submission_')}
                        </Button>
                    </>
                )}
            </GradientBox>
        </Grid>
    )
}
