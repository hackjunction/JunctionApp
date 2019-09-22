import React from 'react';
import styles from './EventDashboardHomeRegistration.module.scss';

import { Row } from 'antd';

import RegistrationStatusBlock from './RegistrationStatusBlock';
import TeamStatusBlock from './TeamStatusBlock';

const EventDashboardHomeRegistration = () => {
    return (
        <Row gutter={16}>
            <RegistrationStatusBlock />
            <TeamStatusBlock />
        </Row>
    );
};

export default EventDashboardHomeRegistration;
