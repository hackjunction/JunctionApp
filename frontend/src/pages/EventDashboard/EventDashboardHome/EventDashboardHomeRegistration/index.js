import React from 'react';
import styles from './EventDashboardHomeRegistration.module.scss';

import { Row } from 'antd';

import RegistrationStatusBlock from './RegistrationStatusBlock';
import TeamStatusBlock from './TeamStatusBlock';
import TravelGrantStatusBlock from './TravelGrantStatusBlock';
import VisaInvitationBlock from './VisaInvitationBlock';

const EventDashboardHomeRegistration = () => {
    return (
        <Row gutter={16}>
            <RegistrationStatusBlock />
            <TravelGrantStatusBlock />
            <VisaInvitationBlock />
            <TeamStatusBlock />
        </Row>
    );
};

export default EventDashboardHomeRegistration;
