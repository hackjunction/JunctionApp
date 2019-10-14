import React from 'react';

import { Grid } from '@material-ui/core';

import RegistrationStatusBlock from './RegistrationStatusBlock';
import TeamStatusBlock from './TeamStatusBlock';
import TravelGrantStatusBlock from './TravelGrantStatusBlock';

const RegistrationPhase = () => {
    const registrationStatus = <RegistrationStatusBlock />;
    const travelGrantStatus = <TravelGrantStatusBlock />;
    const teamStatus = <TeamStatusBlock />;
    return (
        <Grid container spacing={3}>
            {registrationStatus ? (
                <Grid item xs={12} md={6}>
                    {registrationStatus}
                </Grid>
            ) : null}
            {teamStatus ? (
                <Grid item xs={12} md={6}>
                    {teamStatus}
                </Grid>
            ) : null}
            {travelGrantStatus ? (
                <Grid item xs={12} md={6}>
                    <TravelGrantStatusBlock />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default RegistrationPhase;
