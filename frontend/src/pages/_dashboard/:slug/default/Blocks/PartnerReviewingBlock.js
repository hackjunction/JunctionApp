import React from 'react'

import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { Grid, Typography, Box } from '@material-ui/core'
import { RegistrationStatuses, EventHelpers } from '@hackjunction/shared'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)

    if (!event?.challengesEnabled || !event?.challenges) return null
    if (EventHelpers.isEventOver(event, moment)) return null
    if (registration?.status !== RegistrationStatuses.asObject.checkedIn.id)
        return null
    console.log(event.challenge_instructions)
    // TODO: Make the entire message customizeable (With variable inserts)
    // Also at travelgrantblock and gavelreviewingblock
    return (
        <Grid item xs={12} lg={6}>
            <GradientBox p={3} color="theme_orange">
                <Typography variant="button" gutterBottom>
                    Reviewing
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Which challenge to pick?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This event has {event.challenges.length} different
                    challenges which you can submit your project to. If you are
                    submitting Treasure Hunt you have to write the coupon code
                    in the right field. When you are making your submission for
                    Minihack be sure you are uploading the source code, demo
                    URL.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    When submitting your project, you'll be able to choose the
                    challenge that your project applies to. After the submission
                    deadline the jury will review your project, and decide the
                    winner of the challenge.
                </Typography>
                <Box p={1} />
                {event.challenge_instructions ? (
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={() =>
                            window.open(event.challenge_instructions, '_blank')
                        }
                    >
                        View all challenges
                    </Button>
                ) : null}
            </GradientBox>
        </Grid>
    )
}
