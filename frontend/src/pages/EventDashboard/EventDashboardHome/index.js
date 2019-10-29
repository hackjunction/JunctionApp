import React from 'react';

import { connect } from 'react-redux';
import { Box, Grid } from '@material-ui/core';

import PageHeader from 'components/generic/PageHeader';
import * as DashboardSelectors from 'redux/dashboard/selectors';

import QuickLinks from './QuickLinks';
import RegistrationStatusBlock from './Blocks/RegistrationStatusBlock';
import TeamStatusBlock from './Blocks/TeamStatusBlock';
import VisaInvitationBlock from './Blocks/VisaInvitationBlock';
import TravelGrantStatusBlock from './Blocks/TravelGrantStatusBlock';

// const useStyles = makeStyles(theme => ({
//     stepper: {
//         backgroundColor: 'transparent'
//     }
// }));

const EventDashboardHome = ({ event, registration, loading }) => {
    // const classes = useStyles();
    // if (!event || !registration) return null;

    // const getActiveStep = () => {
    //     if (registration.status === 'confirmed') {
    //         return 1;
    //     }
    //     return 0;
    // };

    return (
        <Box>
            <PageHeader heading={event.name} subheading="Dashboard" />
            <Box mt={2} />
            <QuickLinks />
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <Box mb={5}>
                        <RegistrationStatusBlock />
                    </Box>
                    <Box mb={5}>
                        <TravelGrantStatusBlock />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mb={5}>
                        <TeamStatusBlock />
                    </Box>
                    <Box mb={5}>
                        <VisaInvitationBlock />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    loading: DashboardSelectors.registrationLoading(state) || DashboardSelectors.eventLoading(state)
});

export default connect(mapStateToProps)(EventDashboardHome);
