import React, { useState, useEffect } from 'react';

import { Steps, Icon } from 'antd';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { EventStatuses } from '@hackjunction/shared';

import Divider from 'components/generic/Divider';
import PageHeader from 'components/generic/PageHeader';
import RegistrationPhase from './RegistrationPhase';
import EventPhase from './EventPhase';

import EventUtils from 'utils/events';
import EventConstants from 'constants/events';
import * as DashboardSelectors from 'redux/dashboard/selectors';
const EventDashboardHome = ({ event, registration }) => {
    if (!event || !registration) return null;

    function renderContent() {
        return <RegistrationPhase />;
    }

    return (
        <Box>
            <PageHeader heading="Event timeline" />
            <Box mt={2} />
            <Steps current={0}>
                <Steps.Step title="Registration Period" icon={<Icon type="solution" />} />
                <Steps.Step title="In progress" icon={<Icon type="dashboard" />} />
                <Steps.Step title="Finished" icon={<Icon type="crown" />} />
            </Steps>
            <Box mt={2} />
            {renderContent()}
        </Box>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapStateToProps)(EventDashboardHome);
