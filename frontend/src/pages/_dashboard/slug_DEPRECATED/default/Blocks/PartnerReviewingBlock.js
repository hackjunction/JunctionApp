import React from 'react'

import moment from 'moment-timezone'
import { useSelector } from 'react-redux'
import { Grid, Typography, Box } from '@material-ui/core'
import { RegistrationStatuses, EventHelpers } from '@hackjunction/shared'

import * as DashboardSelectors from 'redux/dashboard/selectors'

import Button from 'components/generic/Button'
import GradientBox from 'components/generic/GradientBox'

import { useTranslation } from 'react-i18next'

export default () => {
    const { t } = useTranslation()

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
                    {t('Reviewing_')}
                </Typography>
                <Typography variant="h4" gutterBottom>
                    {t('Which_chanllenge_to_pick_')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('Challenge_info_', {
                        challenges: event.challenges.length,
                    })}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {t('Submission_info_')}
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
                        {t('View_all_challenges_')}
                    </Button>
                ) : null}
            </GradientBox>
        </Grid>
    )
}
