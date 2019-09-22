import React from 'react';
import styles from './SearchAttendeesPage.module.scss';
import { connect } from 'react-redux';
import { Button as AntButton } from 'antd';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as FilterUtils from 'utils/filters';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';
import BulkEditRegistrationDrawer from 'components/modals/BulkEditRegistrationDrawer';
import BulkEmailDrawer from 'components/modals/BulkEmailDrawer';
import AttendeeFilters from './AttendeeFilters';

const SearchAttendeesPage = ({ registrations, registrationsLoading, filters }) => {
    const filtered = FilterUtils.applyFilters(registrations, filters);

    const renderBulkActions = () => {
        if (!registrations.length) return null;
        const ids = registrations.map(r => r._id);
        return (
            <div className={styles.bulkActions}>
                <div style={{ flex: 1 }}>
                    <span className={styles.title}>{registrations.length} registrations</span>
                </div>
                <BulkEmailDrawer registrationIds={ids} />
                <BulkEditRegistrationDrawer registrationIds={ids} />
            </div>
        );
    };

    return (
        <React.Fragment>
            <AttendeeFilters />
            <Divider size={1} />
            {renderBulkActions()}
            <AttendeeTable attendees={filtered} loading={registrationsLoading} />
        </React.Fragment>
    );
};

const mapState = state => ({
    registrations: OrganiserSelectors.registrationsFiltered(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state),
    filters: OrganiserSelectors.registrationsFilters(state)
});

export default connect(mapState)(SearchAttendeesPage);
