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

    return (
        <Grid item xs={12} lg={6}>
            <GradientBox p={3} color="theme_orange">
                <Typography variant="button" gutterBottom>
                    Reviewing
                </Typography>
                <Typography variant="h4" gutterBottom>
                    How to win partner challenges?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This event has {event.challenges.length} different partner
                    challenges which you can submit your project to. It's a good
                    idea to spend some time investigating the different
                    challenges available and discussing with partners to find
                    out what kinds of solutions they are interested in seeing.
                    Try to combine ideas and tools from a few different partner
                    challenges into a single coherent solution to increase your
                    chances of winning something!
                </Typography>
                <Typography variant="body1" gutterBottom>
                    When submitting your project, you'll be able to choose up to
                    5 different partner challenges (from any track) that you
                    want to submit your project to. After the submission
                    deadline the partners whose challenges you participated in
                    will review your project, and decide the winner of their
                    challenge.
                </Typography>
                <Box p={1} />
                {/** TODO: hardcoded for now, make dynamic later */}
                <Button
                    color="theme_white"
                    variant="contained"
                    onClick={() =>
                        window.open(
                            'https://2019.hackjunction.com/challenges',
                            '_blank'
                        )
                    }
                >
                    View all challenges
                </Button>
            </GradientBox>
        </Grid>
    )
}
