import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Typography, Checkbox } from '@material-ui/core';
import { Misc } from '@hackjunction/shared';
import FilterItem from './FilterItem';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

const ACTIVELY_LOOKING = Misc.recruitmentStatuses.items['actively-looking'].id;
const UP_FOR_DISCUSSIONS = Misc.recruitmentStatuses.items['up-for-discussions'].id;

const RecruitmentStatusFilter = ({ filters, setFilters }) => {
    const [draft, setDraft] = useState(filters);
    const handleChange = useCallback(
        value => {
            if (draft.indexOf(value) === -1) {
                setDraft([...draft, value]);
            } else {
                setDraft(draft.filter(item => item !== value));
            }
        },
        [draft]
    );
    const handleSubmit = useCallback(() => {
        setFilters(draft);
    }, [draft, setFilters]);

    return (
        <FilterItem label="Recruitment status" active={filters.length !== 0} onClose={handleSubmit}>
            <Box p={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Actively looking</Typography>
                <Checkbox
                    checked={draft.indexOf(ACTIVELY_LOOKING) !== -1}
                    onChange={() => handleChange(ACTIVELY_LOOKING)}
                    value={ACTIVELY_LOOKING}
                    color="primary"
                    inputProps={{
                        'aria-label': 'secondary checkbox'
                    }}
                />
            </Box>
            <Box p={1} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Up for discussions</Typography>
                <Checkbox
                    checked={draft.indexOf(UP_FOR_DISCUSSIONS) !== -1}
                    onChange={() => handleChange(UP_FOR_DISCUSSIONS)}
                    value={UP_FOR_DISCUSSIONS}
                    color="primary"
                    inputProps={{
                        'aria-label': 'secondary checkbox'
                    }}
                />
            </Box>
        </FilterItem>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state).recruitmentStatuses || []
});

const mapDispatch = dispatch => ({
    setFilters: value => dispatch(RecruitmentActions.setFiltersField('recruitmentStatuses', value))
});

export default connect(
    mapState,
    mapDispatch
)(RecruitmentStatusFilter);
