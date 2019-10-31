import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Box, Slider, Typography } from '@material-ui/core';

import FilterItem from './FilterItem';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

const AgeFilter = ({ filters, setFilters }) => {
    const [draft, setDraft] = useState([0, 120]);

    const handleSubmit = useCallback(() => {
        setFilters(draft);
    }, [draft, setFilters]);

    const handleChange = useCallback((e, value) => {
        setDraft(value);
    }, []);

    return (
        <FilterItem label="Age" active onClose={handleSubmit}>
            <Box padding={2} display="flex" flexDirection="column" justifyContent="space-between" width="300px">
                <Typography>
                    Is between {draft[0]} and {draft[1]}
                </Typography>
                <Box height="50px" />
                <Slider
                    value={draft}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    max={120}
                />
            </Box>
        </FilterItem>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state).age || []
});

const mapDispatch = dispatch => ({
    setFilters: value => dispatch(RecruitmentActions.setFiltersField('age', value))
});

export default connect(
    mapState,
    mapDispatch
)(AgeFilter);
