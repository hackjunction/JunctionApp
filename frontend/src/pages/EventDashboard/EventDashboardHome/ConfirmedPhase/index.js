import React from 'react';

import { Grid, Typography, Link } from '@material-ui/core';

import TravelGrantStatusBlock from './TravelGrantStatusBlock';
import VisaInvitationBlock from './VisaInvitationBlock';
import CheckInBlock from './CheckInBlock';

const ConfirmedPhase = () => {
    const travelGrant = <TravelGrantStatusBlock />;
    const visaInvitation = <VisaInvitationBlock />;
    const checkIn = <CheckInBlock />;
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Awesome! Welcome to Junction 2019!</Typography>
                <Typography variant="body1">
                    To stay in the loop and let your friends know you're coming, you should go attend the{' '}
                    <Link href="https://www.facebook.com/events/891798957858943/" target="_blank">
                        Junction 2019 Facebook event
                    </Link>
                    . For any other questions and further event details such as tracks and challenges, see the{' '}
                    <Link href="https://2019.hackjunction.com" target="_blank">
                        event website
                    </Link>
                    . In the meantime, you should probably start making your travel arrangements as soon as possible.
                    Below you'll find details on your travel grant status, and you'll be able to generate a visa
                    invitation letter which should help you when applying for a visa.
                </Typography>
            </Grid>
            {travelGrant ? (
                <Grid item xs={12} md={6}>
                    {travelGrant}
                </Grid>
            ) : null}
            {visaInvitation ? (
                <Grid item xs={12} md={6}>
                    {visaInvitation}
                </Grid>
            ) : null}
            {checkIn ? (
                <Grid item xs={12}>
                    {checkIn}
                </Grid>
            ) : null}
        </Grid>
    );
};

export default ConfirmedPhase;
