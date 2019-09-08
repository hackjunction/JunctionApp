import React, { useEffect } from 'react';
import styles from './AccountDashboard.module.scss';

import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import * as AccountSelectors from 'redux/account/selectors';
import * as AccountActions from 'redux/account/actions';

import EventCardSmall from 'components/events/EventCardSmall';

const AccountDashboard = ({ registrations, updateRegistrations }) => {
    useEffect(() => {
        updateRegistrations();
    }, [updateRegistrations]);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.sectionTitle}>Your registrations</h3>
            <Row gutter={32}>
                {registrations.map(registration => (
                    <Col xs={24} lg={12} xxl={8}>
                        <EventCardSmall eventId={registration.event} />
                    </Col>
                ))}
            </Row>
        </div>
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
