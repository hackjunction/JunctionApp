import React, { useCallback, useState } from 'react';

import { connect } from 'react-redux';
import { Col, Button as AntButton, Popconfirm } from 'antd';

import { RegistrationStatuses } from '@hackjunction/shared';
import NotificationBlock from 'components/generic/NotificationBlock';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const STATUSES = RegistrationStatuses.asObject;

const RegistrationStatusBlock = ({ event, registration, confirmRegistration, cancelRegistration }) => {
    const [loading, setLoading] = useState(false);
    const handleConfirm = useCallback(() => {
        setLoading(true);
        confirmRegistration(event.slug).finally(() => {
            setLoading(false);
        });
    }, [event.slug, confirmRegistration]);

    const handleCancel = useCallback(() => {
        setLoading(true);
        cancelRegistration(event.slug).finally(() => {
            setLoading(false);
        });
    }, [event.slug, cancelRegistration]);

    if (!registration || !event) return null;

    const PENDING_STATUSES = [STATUSES.pending.id, STATUSES.softAccepted.id, STATUSES.softRejected.id];

    if (PENDING_STATUSES.indexOf(registration.status) !== -1) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="info"
                    title="Registration status:"
                    titleExtra="Pending"
                    body="Your registration is being processed! You'll receive an email notification when we've made the decision, so stay tuned! If you wish, you can still tweak your registration to maximise your chances of being accepted."
                    bottom={
                        <Button
                            size="large"
                            theme="accent"
                            link={{
                                internal: `/events/${event.slug}/register`
                            }}
                            text="Edit your registration"
                        />
                    }
                />
            </Col>
        );
    }

    if (registration.status === STATUSES.accepted.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="success"
                    title="Registration status:"
                    titleExtra="Accepted"
                    body={`Congratulations, your application has been accepted! Welcome to ${event.name}! You'll still need to confirm your participation to lock in your spot though - please click the button below to do so.`}
                    bottom={
                        <Button
                            theme="accent"
                            text="Confirm participation"
                            block
                            button={{ onClick: handleConfirm, loading }}
                        />
                    }
                />
            </Col>
        );
    }

    if (registration.status === STATUSES.rejected.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="error"
                    title={'Registration Status:'}
                    titleExtra={'Rejected'}
                    body={
                        "Unfortunately you didn't quite make it this time...But don't be discouraged, we get a lot of applications and sometimes we have to reject even very talented applicants. Luckily we organise events all of the time, and we would love to have you at one of our other events - see the event calendar below :)"
                    }
                    bottom={
                        <Button
                            text="Event calendar"
                            link={{ external: 'https://www.hackjunction.com/calendar' }}
                            block
                        />
                    }
                />
            </Col>
        );
    }

    if (registration.status === STATUSES.confirmed.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="success"
                    title="Registration status:"
                    titleExtra="Confirmed"
                    body={`Awesome, you've confirmed your participation! You should probably start making travel and other arrangements - see the links below to stay up-to-date on all of the information and announcements related to ${event.name}.`}
                    bottom={
                        <p style={{ fontSize: '16px', textAlign: 'center' }}>
                            To stay in the loop and let your friends know you're coming, you should go attend the{' '}
                            <a
                                href="https://www.facebook.com/events/891798957858943/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Junction 2019 Facebook event!
                            </a>{' '}
                            For any other questions and further event details such as tracks and challenges, see the{' '}
                            <a href="https://2019.hackjunction.com" target="_blank" rel="noopener noreferrer">
                                event website
                            </a>
                            .
                            <br />
                            <br />
                            Can't make it after all? Bummer. Please let us know by clicking the button below, so we can
                            accept someone else in your place.
                            <br />
                            <Popconfirm
                                onConfirm={handleCancel}
                                title="Are you sure? You won't be able to reverse this."
                                okText="Yes, I'm sure"
                                cancelText="Back to safety"
                            >
                                <AntButton type="link" block size="large" loading={loading}>
                                    Cancel participation
                                </AntButton>
                            </Popconfirm>
                        </p>
                    }
                />
            </Col>
        );
    }

    if (registration.status === STATUSES.cancelled.id) {
        return (
            <Col xs={24} md={12}>
                <Divider size={1} />
                <NotificationBlock
                    type="error"
                    title="Registration status:"
                    titleExtra="Cancelled"
                    body={`Bummer that you can't make it - but thanks for letting us know, as now we'll be able to take someone else in your place. Luckily we organise events all of the time, and we would love to have you at one of our other events - see our event calendar below.`}
                    bottom={
                        <React.Fragment>
                            <Button
                                text="Event calendar"
                                block
                                link={{
                                    external: 'https://www.hackjunction.com/calendar'
                                }}
                            />
                            <Divider size={1} />
                            <p style={{ textAlign: 'center' }}>
                                If something has gone horribly wrong and you've cancelled your registration in error,
                                please reach out to us at hello@hackjunction.com as soon as possible and we might be
                                able to still sort this out.
                            </p>
                        </React.Fragment>
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

const mapDispatch = dispatch => ({
    confirmRegistration: slug => dispatch(DashboardActions.confirmRegistration(slug)),
    cancelRegistration: slug => dispatch(DashboardActions.cancelRegistration(slug))
});

export default connect(
    mapState,
    mapDispatch
)(RegistrationStatusBlock);
