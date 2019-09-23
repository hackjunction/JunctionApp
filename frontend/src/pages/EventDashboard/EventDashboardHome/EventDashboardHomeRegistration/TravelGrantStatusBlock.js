import React from 'react';

import { connect } from 'react-redux';
import { Col } from 'antd';

import { RegistrationStatuses } from '@hackjunction/shared';
import NotificationBlock from 'components/generic/NotificationBlock';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const STATUSES = RegistrationStatuses.asObject;

const TravelGrantStatusBlock = ({ event, registration }) => {
    if (!registration || !event) return null;
    if (registration.answers && !registration.answers.needsTravelGrant) return null;

    if (registration.status === STATUSES.accepted.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="info"
                    title="Travel grant:"
                    titleExtra="Pending"
                    body={`After you've confirmed your participation, we'll be able to confirm your travel grant. The earlier you confirm your participation, the more likely you are to receive a travel grant!`}
                />
            </Col>
        );
    }

    if (registration.status === STATUSES.confirmed.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="info"
                    title="Travel grant:"
                    titleExtra="Pending"
                    body={`Thanks for confirming your participation! We'll let you know about your eligibility for a travel grant as soon as possible!`}
                    bottom={
                        <p style={{ fontSize: '16px', textAlign: 'center' }}>
                            Please consult the{' '}
                            <a href="https://2019.hackjunction.com/info" target="_blank" rel="noopener noreferrer">
                                FAQ section
                            </a>{' '}
                            of our website for details on the travel grant amounts available for the country you're
                            travelling from.
                        </p>
                    }
                />
            </Col>
        );
    }
    return null;
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(TravelGrantStatusBlock);
