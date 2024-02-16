import React from 'react'

import { useSelector } from 'react-redux'
import { Grid, Typography, Box } from '@material-ui/core'
import moment from 'moment-timezone'
import {
    RegistrationStatuses,
    ReviewingMethods,
    EventHelpers,
} from '@hackjunction/shared'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    if (event?.reviewMethod !== ReviewingMethods.gavelPeerReview.id) return null
    if (EventHelpers.isEventOver(event, moment)) return null
    if (registration?.status !== RegistrationStatuses.asObject.checkedIn.id)
        return null

    return (
        <Grid item xs={12} lg={6}>
            <GradientBox p={3} color="theme_purple">
                <Typography variant="button" gutterBottom>
                    Reviewing
                </Typography>
                <Typography variant="h4" gutterBottom>
                    How are winners decided?
                </Typography>
                <Typography variant="body1" gutterBottom>
                    The main winner of this event will be decided via
                    peer-reviewing, which means participants will review each
                    others' projects for the duration of the reviewing period.
                    Sounds scary? Don't worry, checking out other people's
                    projects is a ton of fun, and the reviewing process is
                    explained in detail on the reviewing page!
                </Typography>
                {event.tracksEnabled && event.tracks && (
                    <Typography variant="body1" gutterBottom>
                        This event is divided into {event.tracks.length}{' '}
                        different tracks - you can think of them as themes, and
                        each team must choose which track they are participating
                        on when submitting their project. The main winner is
                        decided in two phases: First, the winner of each track
                        will be decided via peer-reviewing. All{' '}
                        {event.tracks.length} track winners will then advance to
                        the finals, and get to demo their project on the main
                        stage in the closing ceremony. The main prize winner
                        will then be decided with a traditional vote - each
                        participant can vote for their favorite project out of
                        the finalists, and the project with the most votes will
                        be crowned the winner of {event.name}!
                    </Typography>
                )}
                <Box p={1} />
                {event.challenge_instructions ? (
                    <Button
                        color="theme_white"
                        variant="contained"
                        onClick={() =>
                            window.open(event.demoInstructions, '_blank')
                        }
                    >
                        More info about reviewing
                    </Button>
                ) : null}
            </GradientBox>
        </Grid>
    )


}
