import React, { useState, useCallback, useEffect } from 'react';
import styles from './SearchAttendeesPage.module.scss';
import { connect } from 'react-redux';
import { FilterHelpers } from '@hackjunction/shared';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import Divider from 'components/generic/Divider';
import AttendeeTable from 'components/tables/AttendeeTable';
import FilterGroupMenu from 'components/filters/FilterGroupMenu';

const SearchAttendeesPage = ({ registrations, registrationsLoading }) => {
    const [filters, setFilters] = useState([]);
    const filtered = FilterHelpers.applyFilters(registrations, filters);

    return (
        <React.Fragment>
            <FilterGroupMenu onChange={setFilters} />
            <Divider size={1} />
            {/* {renderBulkActions()} */}
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
