import React from 'react';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { RegistrationStatuses } from '@hackjunction/shared';
import GradientBox from 'components/generic/GradientBox';
import Button from 'components/generic/Button';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const STATUSES = RegistrationStatuses.asObject;

const TravelGrantStatusBlock = ({ event, registration }) => {
    if (!registration || !event) return null;
    if (registration.answers && !registration.answers.needsTravelGrant) return null;

    if (registration.status === STATUSES.accepted.id) {
        return (
            <GradientBox p={3} color="theme_white">
                <Typography variant="overline">Travel grant</Typography>
                <Typography variant="h4" paragraph>
                    Pending
                </Typography>
                <Typography variant="body1" paragraph>
                    After you've confirmed your participation, we'll be able to confirm your travel grant. The earlier
                    you confirm your participation, the more likely you are to receive a travel grant!
                </Typography>
            </GradientBox>
        );
    }

    if (registration.status === STATUSES.confirmed.id) {
        if (registration.travelGrant === 0) {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography variant="overline">Travel grant</Typography>
                    <Typography variant="h4" color="secondary" paragraph>
                        No grant
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Unfortunately we weren't able to give you a travel grant this time. But don't worry - at the
                        event we'll provide food, snacks, accommodation and much more, at no cost to you!
                    </Typography>
                </GradientBox>
            );
        }

        if (!registration.travelGrant) {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography variant="overline">Travel grant</Typography>
                    <Typography variant="h4" paragraph>
                        Pending
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Thanks for confirming your participation! We'll let you know about your eligibility for a travel
                        grant as soon as possible! Please consult the FAQ on our website for details on the travel grant
                        amounts available for the country you're travelling from.
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => window.open('https://2019.hackjunction.com/info#faq', '_blank')}
                    >
                        Frequently asked questions
                    </Button>
                </GradientBox>
            );
        } else {
            return (
                <GradientBox p={3} color="theme_white">
                    <Typography variant="overline">Travel grant</Typography>
                    <Typography variant="h4" color="primary" paragraph>
                        {`Up to ${registration.travelGrant}€`}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {`Yay! You're eligible for a travel grant of up to ${registration.travelGrant}€. To be eligible for this travel grant, please make sure you keep hold of all receipts related to your travel to the event. You'll be able to submit your travel receipts and other information required for payment here once you have checked in to the event.`}
                    </Typography>
                </GradientBox>
            );
        }
    }

    return null;
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(TravelGrantStatusBlock);
