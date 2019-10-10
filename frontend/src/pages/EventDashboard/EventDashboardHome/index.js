import React, { useState, useEffect } from 'react';

import { Steps, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import Divider from 'components/generic/Divider';
import PageHeader from 'components/generic/PageHeader';
import RegistrationPhase from './RegistrationPhase';
import EventPhase from './EventPhase';

import EventUtils from 'utils/events';
import EventConstants from 'constants/events';
import * as DashboardSelectors from 'redux/dashboard/selectors';
const EventDashboardHome = ({ event, registration }) => {
    const [currentStep, setCurrentStep] = useState(1);

    // useEffect(() => {
    //     if (event) {
    //         const status = EventUtils.getEventStatus(event);
    //         setCurrentStep(status.index);
    //     }
    // }, [event]);

    if (!event || !registration) return null;

    function renderContent() {
        switch (currentStep) {
            case EventConstants.STATUS.Registration.index:
            case EventConstants.STATUS.Confirmation.index:
                return <RegistrationPhase />;
            case EventConstants.STATUS.InProgress.index:
                return <EventPhase />;
            case EventConstants.STATUS.Finished.index:
                return <h1>Finished</h1>;
            default:
                return null;
        }
    }

    return (
        <Box>
            <PageHeader heading="Event timeline" />
            <Steps current={currentStep - 1}>
                <Steps.Step title="Registration Period" icon={<Icon type="solution" />} />
                <Steps.Step title="In progress" icon={<Icon type="dashboard" />} />
                <Steps.Step title="Finished" icon={<Icon type="crown" />} />
            </Steps>
            {renderContent()}
        </Box>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapStateToProps)(EventDashboardHome);
