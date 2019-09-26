import React, { useState } from 'react';
import styles from './SearchAttendeesPage.module.scss';
import { connect } from 'react-redux';
import { Button as AntButton } from 'antd';
import { FilterHelpers } from '@hackjunction/shared';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as FilterUtils from 'utils/filters';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';
import BulkEmailDrawer from 'components/modals/BulkEmailDrawer';
import FilterForm from 'components/filters/FilterForm';

const SearchAttendeesPage = ({ registrations, registrationsLoading, filters }) => {
    const [filter, setFilter] = useState();

    const renderBulkActions = () => {
        if (!registrations.length) return null;
        const ids = registrations.map(r => r._id);
        const userIds = registrations.map(r => r.user);
        return (
            <div className={styles.bulkActions}>
                <div style={{ flex: 1 }}>
                    <span className={styles.title}>{registrations.length} registrations</span>
                </div>
                <BulkEmailDrawer registrationIds={userIds} />
                <BulkEditRegistrationDrawer registrationIds={ids} />
            </div>
        );
    };

    const filtered = FilterHelpers.applyFilters(registrations, [filter]);

    return (
        <React.Fragment>
            <FilterForm onSubmit={setFilter} />
            <Divider size={1} />
            {renderBulkActions()}
            <AttendeeTable attendees={filtered} loading={registrationsLoading} />
        </React.Fragment>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrations(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state),
    filters: []
});

export default connect(mapState)(SearchAttendeesPage);
