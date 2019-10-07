import React, { useState, useEffect } from 'react';
import styles from './EventDashboardHome.module.scss';

import { Steps, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux';

import Divider from 'components/generic/Divider';

import EventDashboardHomeRegistration from './EventDashboardHomeRegistration';

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
                return <EventDashboardHomeRegistration />;
            case EventConstants.STATUS.InProgress.index:
                return <h1>Event in progress</h1>;
            case EventConstants.STATUS.Finished.index:
                return <h1>Finished</h1>;
            default:
                return null;
        }
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.sectionTitle}>Event timeline</h1>
            <Divider size={1} />
            <Row>
                <Col xs={0} lg={24}>
                    <Steps current={currentStep - 1}>
                        <Steps.Step title="Registration Period" icon={<Icon type="solution" />} />
                        <Steps.Step title="In progress" icon={<Icon type="dashboard" />} />
                        <Steps.Step title="Finished" icon={<Icon type="crown" />} />
                    </Steps>
                </Col>
                <Col xs={24} lg={0}>
                    <Steps direction="vertical" current={currentStep - 1}>
                        <Steps.Step title="Registration Period" icon={<Icon type="solution" />} />
                        <Steps.Step title="In progress" icon={<Icon type="dashboard" />} />
                        <Steps.Step title="Finished" icon={<Icon type="crown" />} />
                    </Steps>
                </Col>
            </Row>
            <Divider size={1} />
            {renderContent()}
        </div>
    );
};

const mapStateToProps = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapStateToProps)(EventDashboardHome);
