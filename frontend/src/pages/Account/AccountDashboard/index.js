import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import * as AccountSelectors from 'redux/account/selectors';
import * as AccountActions from 'redux/account/actions';

import EventCardSmall from 'components/events/EventCardSmall';

const AccountDashboard = ({ registrations, updateRegistrations }) => {
    useEffect(() => {
        updateRegistrations();
    }, [updateRegistrations]);

    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <Typography variant="h6" paragraph>
                    Your registrations
                </Typography>
            </Grid>
            {registrations.map(registration => (
                <Grid item xs={12} lg={4}>
                    <EventCardSmall eventId={registration.event} />
                </Grid>
            ))}
        </Grid>
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
