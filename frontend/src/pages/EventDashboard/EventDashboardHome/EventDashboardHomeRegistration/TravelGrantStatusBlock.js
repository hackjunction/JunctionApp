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
        if (registration.travelGrant === 0) {
            return (
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <NotificationBlock
                        type="error"
                        title="Travel grant:"
                        titleExtra="No grant"
                        body={`Unfortunately we weren't able to give you a travel grant this time. But don't worry - at the event we'll provide food, snacks, accommodation and much more, at no cost to you!`}
                    />
                </Col>
            );
        }

        if (!registration.travelGrant) {
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

        if (registration.travelGrant > 0) {
            return (
                <Col xs={24} md={12}>
                    <Divider size={1} />
                    <NotificationBlock
                        type="success"
                        title="Travel grant:"
                        titleExtra={`Up to ${registration.travelGrant}€`}
                        body={`Yay! You're eligible for a travel grant of up to ${registration.travelGrant}€. To be eligible for this travel grant, please make sure you keep hold of all receipts related to your travel to the event. You'll be able to submit your travel receipts and other information required for payment here once you have checked in to the event.`}
                    />
                </Col>
            );
        }
    }

    return null;
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    registration: DashboardSelectors.registration(state)
});

export default connect(mapState)(TravelGrantStatusBlock);
