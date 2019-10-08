import React, { useMemo, useState } from 'react';

import { connect } from 'react-redux';
import { groupBy, filter } from 'lodash-es';
import { RegistrationStatuses } from '@hackjunction/shared';
import { Row, Col, Card, Statistic, Tag, List, Button as AntButton, notification } from 'antd';
import Divider from 'components/generic/Divider';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import RegistrationsService from 'services/registrations';

const STATUSES = RegistrationStatuses.asObject;

const AdminPage = ({ registrations, idToken, event }) => {
    const [bulkAcceptLoading, setBulkAcceptLoading] = useState(false);
    const [bulkRejectLoading, setBulkRejectLoading] = useState(false);
    const groupedByStatus = useMemo(() => {
        return groupBy(registrations, 'status');
    }, [registrations]);

    const getCount = (statuses = []) => {
        return statuses.reduce((res, status) => {
            if (groupedByStatus.hasOwnProperty(status)) {
                return res + groupedByStatus[status].length;
            }
            return res;
        }, 0);
    };

    const handleBulkAccept = () => {
        setBulkAcceptLoading(true);
        RegistrationsService.bulkAcceptRegistrationsForEvent(idToken, event.slug)
            .then(data => {
                notification.success({
                    message: 'Success!',
                    description: 'All soft accepted registrations have been accepted'
                });
            })
            .catch(err => {
                notification.error({
                    message: 'Something went wrong...',
                    description: "Are you sure you're connected to the internet?"
                });
            })
            .finally(() => {
                setBulkAcceptLoading(false);
            });
    };

    const total = registrations.length;
    const rated = filter(registrations, reg => reg.rating).length;
    const ratedOrAssigned = filter(registrations, reg => reg.rating || reg.assignedTo).length;

    const ACTIONS = [
        {
            title: 'Accept all soft accepted',
            description:
                'Change the status of all Soft Accepted participants to Accepted, and notify them via email that they have been accepted to the event!',
            extra: (
                <AntButton onClick={handleBulkAccept} type="link" loading={bulkAcceptLoading}>
                    Accept
                </AntButton>
            )
        },
        {
            title: 'Reject all soft rejected',
            description:
                'Change the status of all Soft Rejected participants to Rejected, and notify them via email that they did not make it.',
            extra: (
                <AntButton
                    onClick={() => window.alert('Get permission from Juuso to do this ;--)')}
                    type="link"
                    loading={bulkRejectLoading}
                >
                    Reject
                </AntButton>
            )
        }
    ];

    return (
        <React.Fragment>
            <Divider size={1} />
            <Row gutter={16}>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card title="Total registrations">
                        <Statistic title="" value={total}></Statistic>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card title="Rated">
                        <Statistic title="" value={`${rated} / ${total}`}></Statistic>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Divider size={1} />
                    <Card title="Rated or Assigned">
                        <Statistic title="" value={`${ratedOrAssigned} / ${total}`}></Statistic>
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="By status" bodyStyle={{ padding: 0 }}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.pending.color}>{STATUSES.pending.label}</Tag>
                                    <Statistic value={getCount(['pending'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.softAccepted.color}>{STATUSES.softAccepted.label}</Tag>
                                    <Statistic value={getCount(['softAccepted'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.accepted.color}>{STATUSES.accepted.label}</Tag>
                                    <Statistic value={getCount(['accepted'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.softRejected.color}>{STATUSES.softRejected.label}</Tag>
                                    <Statistic value={getCount(['softRejected'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.rejected.color}>{STATUSES.rejected.label}</Tag>
                                    <Statistic value={getCount(['rejected'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.confirmed.color}>{STATUSES.confirmed.label}</Tag>
                                    <Statistic value={getCount(['confirmed'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.checkedIn.color}>{STATUSES.checkedIn.label}</Tag>
                                    <Statistic value={getCount(['checkedIn'])} />
                                </Card.Grid>
                            </Col>
                            <Col xs={12} md={6}>
                                <Card.Grid style={{ width: '100%' }}>
                                    <Tag color={STATUSES.noShow.color}>{STATUSES.noShow.label}</Tag>
                                    <Statistic value={getCount(['noShow'])} />
                                </Card.Grid>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24}>
                    <Divider size={1} />
                    <Card title="Actions">
                        <List>
                            <List
                                itemLayout="horizontal"
                                dataSource={ACTIONS}
                                renderItem={item => (
                                    <List.Item extra={item.extra}>
                                        <List.Item.Meta title={item.title} description={item.description} />
                                    </List.Item>
                                )}
                            />
                        </List>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrations(state),
    event: OrganiserSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});
export default connect(mapState)(AdminPage);
