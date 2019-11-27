import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import { Dialog } from '@material-ui/core';

import PageHeader from 'components/generic/PageHeader';
import CenteredContainer from 'components/generic/CenteredContainer';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import ApplicationsTable from './ApplicationsTable';
import ApplicationDetail from './ApplicationDetail';

const TravelGrantsPage = ({ items }) => {
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
    const activeIdx = params.get('view');
    const activeRow = activeIdx ? items[activeIdx] : null;

    const handleRowClick = useCallback(
        (data, rowMeta) => {
            history.push(location.pathname + '?view=' + rowMeta.dataIndex);
        },
        [history, location]
    );

    return (
        <>
            <PageHeader heading="Travel Grants" subheading="Manage travel grants" />
            <ApplicationsTable data={items} onRowClick={handleRowClick} />
            <Dialog fullScreen open={Boolean(activeRow)} onClose={() => history.goBack()}>
                <ApplicationDetail data={activeRow} />
            </Dialog>
        </>
    );
};

const mapState = state => ({
    items: OrganiserSelectors.registrationsWithTravelGrant(state)
});

export default connect(mapState)(TravelGrantsPage);
