import React, { useState, useEffect } from 'react';

import { Steps, Icon } from 'antd';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Stepper, Step, StepLabel, StepContent, Typography, CircularProgress } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { EventStatuses } from '@hackjunction/shared';

import Divider from 'components/generic/Divider';
import PageHeader from 'components/generic/PageHeader';
import TimelineDot from 'components/generic/TimelineDot';
import RegistrationPhase from './RegistrationPhase';
import ConfirmedPhase from './ConfirmedPhase';
import EventPhase from './EventPhase';

import EventUtils from 'utils/events';
import EventConstants from 'constants/events';
import * as DashboardSelectors from 'redux/dashboard/selectors';

const useStyles = makeStyles(theme => ({
    stepper: {
        backgroundColor: 'transparent'
    }
}));

const EventDashboardHome = ({ event, registration, loading }) => {
    const classes = useStyles();
    if (!event || !registration) return null;

    function renderContent() {
        switch (currentStep) {
            case 0:
                return <RegistrationPhase />;
            case 1:
                return <EventPhase />;
            default:
                return <RegistrationPhase />;
        }
    }

    const currentStep = 1;

    const getActiveStep = () => {
        if (registration.status === 'confirmed') {
            return 1;
        }
        return 0;
    };

    return (
        <Box>
            <PageHeader heading="Event timeline" />
            <Box mt={2} />
            {loading ? (
                <Box p={2} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size={24} />
                </Box>
            ) : (
                <Stepper activeStep={getActiveStep()} className={classes.stepper} orientation="vertical">
                    <Step key="pending">
                        <StepLabel StepIconComponent={TimelineDot}>
                            <Typography variant="button">Registration period</Typography>
                        </StepLabel>
                        <StepContent>
                            <RegistrationPhase />
                        </StepContent>
                    </Step>
                    <Step key="confirmed">
                        <StepLabel StepIconComponent={TimelineDot}>
                            <Typography variant="button">Confirmed participation</Typography>
                        </StepLabel>
                        <StepContent>
                            <ConfirmedPhase />
                        </StepContent>
                    </Step>
                    <Step key="event">
                        <StepLabel StepIconComponent={TimelineDot}>
                            <Typography variant="button">Event in progress</Typography>
                        </StepLabel>
                        <StepContent>
                            <RegistrationPhase />
                        </StepContent>
                    </Step>
                    <Step key="event-finished">
                        <StepLabel StepIconComponent={TimelineDot}>
                            <Typography variant="button">Event finished</Typography>
                        </StepLabel>
                        <StepContent>
                            <Box mt={3} />
                        </StepContent>
                    </Step>
                </Stepper>
            )}
            {/* <Steps current={currentStep}>
                <Steps.Step title="Registration Period" icon={<Icon type="solution" />} />
                <Steps.Step title="In progress" icon={<Icon type="dashboard" />} />
                <Steps.Step title="Finished" icon={<Icon type="crown" />} />
            </Steps>
            <Box mt={2} />
            {renderContent()} */}
        </Box>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state),
    loading: DashboardSelectors.registrationLoading(state) || DashboardSelectors.eventLoading(state)
});

export default connect(mapStateToProps)(EventDashboardHome);
