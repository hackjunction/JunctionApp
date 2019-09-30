import React, { useMemo, useState, useCallback, useEffect } from 'react';
import styles from './OrganiserEditEventGrants.module.scss';

import { PageHeader } from 'antd';
import { connect } from 'react-redux';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

import PageWrapper from 'components/PageWrapper';
import BulkAssignGrantsPage from './BulkAssignGrantsPage';

const OrganiserEditEventGrants = ({}) => {
    return (
        <PageWrapper>
            <PageHeader
                title="Travel grants"
                children={<p>Configure travel grants for your participants</p>}
                footer={<BulkAssignGrantsPage />}
            ></PageHeader>
        </PageWrapper>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    registrations: OrganiserSelectors.registrationsConfirmed(state),
    loading: OrganiserSelectors.registrationsLoading(state),
    error: OrganiserSelectors.registrationsError(state)
});

export default connect(
    mapState
)(OrganiserEditEventGrants);
