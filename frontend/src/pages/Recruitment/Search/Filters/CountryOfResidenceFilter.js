import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import FilterItem from './FilterItem';
import Select from 'components/inputs/Select';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

const CountryOfResidenceFilter = ({ filters, setFilters }) => {
    const [draft, setDraft] = useState(filters);

    const handleSubmit = useCallback(() => {
        setFilters(draft);
    }, [draft, setFilters]);

    const handleReset = useCallback(() => {
        setDraft(filters);
    }, [filters]);

    return (
        <FilterItem
            label="Country of residence"
            active={filters.length > 0}
            onSubmit={handleSubmit}
            onClose={handleReset}
        >
            <Box width="300px" height="300px" overflow="hidden">
                <Select options="country" value={draft} onChange={setDraft} isMulti={true} autoFocus />
            </Box>
        </FilterItem>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state).countryOfResidence || []
});

const mapDispatch = dispatch => ({
    setFilters: value => dispatch(RecruitmentActions.setFiltersField('countryOfResidence', value))
});

export default connect(
    mapState,
    mapDispatch
)(CountryOfResidenceFilter);
