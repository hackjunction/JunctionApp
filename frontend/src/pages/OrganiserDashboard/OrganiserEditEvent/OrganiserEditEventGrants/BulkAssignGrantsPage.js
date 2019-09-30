import React from 'react';
import { connect } from 'react-redux';

import { Grid } from '@material-ui/core';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import TravelGrantStepper from './TravelGrantStepper';

const BulkAssignGrantsPage = ({ registrations, filterGroups }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TravelGrantStepper />
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrations(state),
    filterGroups: OrganiserSelectors.filterGroups(state)
});

export default connect(mapState)(BulkAssignGrantsPage);
