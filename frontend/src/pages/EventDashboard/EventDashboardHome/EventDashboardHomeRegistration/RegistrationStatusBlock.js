import React from 'react';

import { connect } from 'react-redux';
import { Col } from 'antd';

import { RegistrationStatuses } from '@hackjunction/shared';
import NotificationBlock from 'components/generic/NotificationBlock';
import Button from 'components/generic/Button';
import Divider from 'components/generic/Divider';

import * as DashboardSelectors from 'redux/dashboard/selectors';

const STATUSES = RegistrationStatuses.asObject;

const RegistrationStatusBlock = ({ event, registration }) => {
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
                            button={{ onClick: () => window.alert('Confirm this stuff!') }}
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
                        <React.Fragment>
                            <Button
                                text="Event website"
                                block
                                link={{
                                    external: 'https://2019.hackjunction.com'
                                }}
                            />
                            <Divider size={1} />
                            <Button
                                text="Facebook event"
                                block
                                link={{
                                    external: 'https://facebook.com'
                                }}
                            />
                            <Divider size={1} />
                            <Button
                                theme="danger"
                                text="Can't make it after all?"
                                block
                                button={{ onClick: () => window.alert('Cancel this shit!') }}
                            />
                        </React.Fragment>
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

export default connect(mapState)(RegistrationStatusBlock);
