import React from 'react'

import { useSelector } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import { RegistrationStatuses, EventTypes } from '@hackjunction/shared'
import GradientBox from 'components/generic/GradientBox'
import Button from 'components/generic/Button'

import * as DashboardSelectors from 'redux/dashboard/selectors'

const STATUSES = RegistrationStatuses.asObject

export default () => {
    const event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    if (event?.eventType === EventTypes.online.id) return null
    if (!registration?.answers?.needsTravelGrant) return null

    // TODO: When status is checkedIn, show the travel grant details submission form here

    if (
        registration.status === STATUSES.accepted.id ||
        registration.status === STATUSES.acceptedToHub.id
    ) {
        return (
            <Grid item xs={12} md={6}>
                <GradientBox p={3} color="theme_white">
                    <Typography variant="button">Travel grant</Typography>
                    <Typography variant="h4" paragraph>
                        Pending
                    </Typography>
                    <Typography variant="body1" paragraph>
                        After you've confirmed your participation, we'll be able
                        to confirm your travel grant. The earlier you confirm
                        your participation, the more likely you are to receive a
                        travel grant!
                    </Typography>
                </GradientBox>
            </Grid>
        )
    }

    if (registration.status === STATUSES.confirmed.id) {
        if (registration.travelGrant === 0) {
            return (
                <Grid item xs={12} md={6}>
                    <GradientBox p={3} color="theme_white">
                        <Typography variant="button">Travel grant</Typography>
                        <Typography variant="h4" color="secondary" paragraph>
                            No grant
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Unfortunately we weren't able to give you a travel
                            grant this time. But don't worry - at the event
                            we'll provide food, snacks, accommodation and much
                            more, at no cost to you!
                        </Typography>
                    </GradientBox>
                </Grid>
            )
        }

        if (!registration.travelGrant) {
            return (
                <Grid item xs={12} md={6}>
                    <GradientBox p={3} color="theme_white">
                        <Typography variant="button">Travel grant</Typography>
                        <Typography variant="h4" paragraph>
                            Pending
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Thanks for confirming your participation! We'll let
                            you know about your eligibility for a travel grant
                            as soon as possible! Please consult the FAQ on our
                            website for details on the travel grant amounts
                            available for the country you're travelling from.
                        </Typography>
                        {event.challenge_instructions ? (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => window.open(event.faq, '_blank')}
                            >
                                Frequently asked questions
                            </Button>
                        ) : null}
                    </GradientBox>
                </Grid>
            )
        } else {
            return (
                <Grid item xs={12} md={6}>
                    <GradientBox p={3} color="theme_white">
                        <Typography variant="button">Travel grant</Typography>
                        <Typography variant="h4" color="primary" paragraph>
                            {`Up to ${registration.travelGrant}€`}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {`Yay! You're eligible for a travel grant of up to ${registration.travelGrant}€. To be eligible for this travel grant, please make sure you keep hold of all receipts related to your travel to the event. You'll be able to submit your travel receipts and other information required for payment here once you have checked in to the event.`}
                        </Typography>
                    </GradientBox>
                </Grid>
            )
        }
    }

    return null
}
