import React, { useMemo } from 'react';
import styles from './OrganiserEditEventGrants.module.scss';

import { connect } from 'react-redux';
import { Table } from 'antd';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import PageWrapper from 'components/PageWrapper';

const OrganiserEditEventGrants = ({ registrations, travelGrantsByUser, loading, error }) => {
    const data = useMemo(() => {
        console.log('BY USER', travelGrantsByUser);
        return registrations;
    }, [registrations, travelGrantsByUser]);

    return (
        <PageWrapper loading={false}>
            <Table dataSource={data} rowKey="user">
                <Table.Column key="firstName" dataIndex="answers.firstName" title="First name" />
                <Table.Column key="lastName" dataIndex="answers.lastName" title="Last name" />
                <Table.Column key="email" dataIndex="answers.email" title="Email" />
                <Table.Column key="actions" title="Actions" />
            </Table>
        </PageWrapper>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrations(state),
    travelGrantsByUser: OrganiserSelectors.travelGrantsMap(state),
    loading: OrganiserSelectors.registrationsLoading(state) || OrganiserSelectors.travelGrantsLoading(state),
    error: OrganiserSelectors.registrationsError(state) || OrganiserSelectors.travelGrantsError(state)
});

export default connect(mapState)(OrganiserEditEventGrants);
