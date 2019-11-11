import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Grid, Box, Typography } from '@material-ui/core';

import * as AccountSelectors from 'redux/account/selectors';
import * as AccountActions from 'redux/account/actions';

import EventCardSmall from 'components/events/EventCardSmall';

const AccountDashboard = ({ registrations, updateRegistrations }) => {
    useEffect(() => {
        updateRegistrations();
    }, [updateRegistrations]);

    return (
        <Box p={2}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6" paragraph>
                        Your registrations
                    </Typography>
                </Grid>
                {registrations.map(registration => (
                    <Grid key={registration._id} item xs={12} md={6}>
                        <EventCardSmall eventId={registration.event} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const mapStateToProps = state => ({
    registrations: AccountSelectors.registrations(state)
});

const mapDispatchToProps = dispatch => ({
    updateRegistrations: () => dispatch(AccountActions.updateRegistrations())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDashboard);
