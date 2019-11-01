import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';

import { Grid, Box, Typography } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import Pagination from './Pagination';
import LoadingCard from './LoadingCard';

const SearchResults = ({
    searchResults,
    searchResultsCount,
    updateSearchResults,
    filters,
    pageSize,
    page,
    pageCount,
    setNextPage,
    setPrevPage,
    loading
}) => {
    const [selected, setSelected] = useState();
    console.log(searchResults)
    useEffect(() => {
        updateSearchResults();
    }, [pageSize, page, filters, updateSearchResults]); //eslint-disable-line

    return (
        <React.Fragment>
            <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">{searchResultsCount} results</Typography>
                <Pagination />
            </Box>
            {loading ? (
                <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(index => (
                        <Grid
                            direction="row"
                            alignItems="stretch"
                            container
                            key={index}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <LoadingCard />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                    <Grid direction="row" alignItems="stretch" container spacing={2}>
                        {searchResults.map(item => (
                            <Grid
                                direction="row"
                                alignItems="stretch"
                                container
                                key={`item-${item.userId}`}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <ResultCard data={item} onClick={e => setSelected(item.userId)} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            <Box p={2} display="flex" flexDirection="row" justifyContent="flex-end">
                <Pagination />
            </Box>
            <RecruitmentUserModal profileId={selected} onClose={setSelected} />
        </React.Fragment>
    );
};

const mapState = state => ({
    searchResults: RecruitmentSelectors.searchResults(state),
    searchResultsCount: RecruitmentSelectors.searchResultsCount(state),
    loading: RecruitmentSelectors.searchResultsLoading(state),
    filters: RecruitmentSelectors.filters(state),
    pageSize: RecruitmentSelectors.pageSize(state),
    page: RecruitmentSelectors.page(state),
    pageCount: RecruitmentSelectors.pageCount(state)
});

const mapDispatch = dispatch => ({
    updateSearchResults: () => dispatch(RecruitmentActions.updateSearchResults()),
    setPrevPage: () => dispatch(RecruitmentActions.setPrevPage()),
    setNextPage: () => dispatch(RecruitmentActions.setNextPage())
});

export default connect(
    mapState,
    mapDispatch
)(SearchResults);
