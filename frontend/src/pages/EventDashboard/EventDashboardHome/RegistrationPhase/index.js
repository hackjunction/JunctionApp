import React from 'react';

import { Grid, Box } from '@material-ui/core';

import RegistrationStatusBlock from './RegistrationStatusBlock';
import TeamStatusBlock from './TeamStatusBlock';
import TravelGrantStatusBlock from './TravelGrantStatusBlock';
import VisaInvitationBlock from './VisaInvitationBlock';

const RegistrationPhase = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <RegistrationStatusBlock />
            </Grid>
            <Grid item xs={12} md={6}>
                <TravelGrantStatusBlock />
                <Box mt={1} />
                <VisaInvitationBlock />
            </Grid>
            <Grid item xs={12} md={6}>
                <TeamStatusBlock />
            </Grid>
        </Grid>
    );
};

export default RegistrationPhase;
