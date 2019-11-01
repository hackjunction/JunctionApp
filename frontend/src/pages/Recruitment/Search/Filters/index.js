import React, { useState, useCallback, useEffect } from 'react';

import { Box, CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

import * as RecruitmentActions from 'redux/recruitment/actions';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

import { useDebounce } from 'hooks/customHooks';

import RecruitmentStatusFilter from './RecruitmentStatusFilter';
import CountryOfResidenceFilter from './CountryOfResidenceFilter';
import AgeFilter from './AgeFilter';
import SkillsFilter from './SkillsFilter';
import RolesFilter from './RolesFilter';
import FilteredBy from './FilteredBy';
import TextInput from 'components/inputs/TextInput';

const Filters = ({ filters, setTextSearch, loading }) => {
    const [searchValue, setSearchValue] = useState(filters.textSearch || '');

    const debouncedSearchValue = useDebounce(searchValue, 500);
    const handleSearch = useCallback(
        value => {
            setTextSearch(value);
        },
        [setTextSearch]
    );

    useEffect(() => {
        handleSearch(debouncedSearchValue);
    }, [debouncedSearchValue, handleSearch]);

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start">
                <SearchIcon />
                <Box width="300px" pl={0.5} pr={1}>
                    <TextInput value={searchValue} onChange={setSearchValue} placeholder="Search by name/email" />
                </Box>
                {loading && <CircularProgress size={24} />}
            </Box>
            <motion.div
                animate={{
                    overflow: 'hidden',
                    height: searchValue.length === 0 ? 'auto' : 0,
                    opacity: searchValue.length === 0 ? 1 : 0
                }}
            >
                <Box p={2} display="flex" flexDirection="row" alignItems="flex-end" flexWrap="wrap">
                    <RecruitmentStatusFilter />
                    <CountryOfResidenceFilter />
                    <AgeFilter />
                    <SkillsFilter />
                    <RolesFilter />
                    <FilteredBy />
                </Box>
            </motion.div>
        </Box>
    );
};

const mapState = state => ({
    filters: RecruitmentSelectors.filters(state),
    loading: RecruitmentSelectors.searchResultsLoading(state)
});

const mapDispatch = dispatch => ({
    setTextSearch: value => dispatch(RecruitmentActions.setFiltersField('textSearch', value))
});

export default connect(
    mapState,
    mapDispatch
)(Filters);
