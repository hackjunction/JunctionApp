import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { Typography, Grid } from '@material-ui/core'
import NotificationBlock from 'components/generic/NotificationBlock'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'

import * as DashboardSelectors from 'redux/dashboard/selectors'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const appliedAsTeam = useSelector(DashboardSelectors.appliedAsTeam)
    const hasTeam = useSelector(DashboardSelectors.hasTeam)
    const isTeamComplete = useSelector(DashboardSelectors.isTeamComplete)
    const isAcceptancePending = useSelector(
        DashboardSelectors.isAcceptancePending
    )

    if (!registration || !event) return <NotificationBlock loading />

    if (isAcceptancePending) {
        if (appliedAsTeam) {
            if (!hasTeam) {
                return (
                    <Grid item xs={12} md={6}>
                        <GradientBox p={3} color="theme_white">
                            <Typography
                                key="overline"
                                variant="button"
                                color="inherit"
                            >
                                Team status
                            </Typography>
                            <Typography
                                key="title"
                                variant="h4"
                                color="secondary"
                                paragraph
                            >
                                No team
                            </Typography>
                            <Typography key="body" variant="body1" paragraph>
                                You've chosen to apply as a team but haven't
                                joined a team yet. You'll need to join a team
                                before we'll begin processing your application!
                            </Typography>
                            <Button
                                color="theme_turquoise"
                                variant="contained"
                                onClick={() =>
                                    dispatch(
                                        push(`/dashboard/${event.slug}/team`)
                                    )
                                }
                            >
                                Create or join a team
                            </Button>
                        </GradientBox>
                    </Grid>
                )
            } else if (!isTeamComplete) {
                return (
                    <Grid item xs={12} md={6}>
                        <GradientBox p={3} color="theme_white">
                            <Typography
                                key="overline"
                                variant="button"
                                color="inherit"
                            >
                                Team status
                            </Typography>
                            <Typography
                                key="title"
                                variant="h4"
                                color="secondary"
                                paragraph
                            >
                                Pending
                            </Typography>
                            <Typography key="body" variant="body1" paragraph>
                                Registering your team prior to event makes it
                                easier for us to review your application.
                            </Typography>
                            <Button
                                color="theme_turquoise"
                                variant="contained"
                                onClick={() =>
                                    dispatch(
                                        push(`/dashboard/${event.slug}/team`)
                                    )
                                }
                            >
                                Edit your team
                            </Button>
                        </GradientBox>
                    </Grid>
                )
            } else {
                return (
                    <Grid item xs={12} md={6}>
                        <GradientBox p={3} color="theme_white">
                            <Typography
                                key="overline"
                                variant="button"
                                color="inherit"
                            >
                                Team status
                            </Typography>
                            <Typography
                                key="title"
                                variant="h4"
                                color="primary"
                                paragraph
                            >
                                Complete
                            </Typography>
                            <Typography key="body" variant="body1" paragraph>
                                You've locked in your team and we can now
                                process your team members' applications - just
                                sit back and relax. You'll also be able to edit
                                your team again closer to the event, if you want
                                to add or remove members.
                            </Typography>
                        </GradientBox>
                    </Grid>
                )
            }
        }
    } else {
        // TODO: Reminder about finalizing team before submission deadline, as it can no longer be edited
    }

    return null
}
