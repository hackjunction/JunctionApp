import React, { useState } from 'react';

import Divider from 'components/generic/Divider';
import Filters from './Filters';
import AttendeeTable from './AttendeeTable';

const SearchAttendeesPage = ({ idToken, slug }) => {
    const [filters, setFilters] = useState({
        notRatedOnly: true,
        limit: 50
    });
    return (
        <React.Fragment>
            <Divider size={1} />
            <Filters onSubmit={setFilters} initial={filters} />
            <Divider size={1} />
            <AttendeeTable filters={filters} idToken={idToken} slug={slug} />
        </React.Fragment>
    );
};

export default SearchAttendeesPage;
