import React from 'react';

import { Grid } from '@material-ui/core';
import CheckInBlock from './CheckInBlock';

const EventPhase = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CheckInBlock />
            </Grid>
        </Grid>
    );
};

export default EventPhase;
