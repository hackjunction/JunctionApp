import React, { useState, useEffect } from 'react';
import Empty from 'components/generic/Empty';
import { push } from 'connected-react-router';
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
    loading,
    paginationEnabled
}) => {
    useEffect(() => {
        updateSearchResults();
    }, [pageSize, page, filters, updateSearchResults]); //eslint-disable-line

    const renderLoading = () => {
        if (!loading) return null;
        if (searchResults.length === 0) {
            return (
                <Grid container spacing={2}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(index => (
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
            );
        }
        return null;
    };

    const renderResults = () => {
        if (searchResults.length === 0) {
            if (filters.textSearch) {
                return (
                    <Empty isEmpty emptyText="No results / too many results. Please try specifying your search term." />
                );
            } else {
                return <Empty isEmpty emptyText="No results with the selected filters." />;
            }
        }
        return (
            <Grid direction="row" alignItems="stretch" container spacing={2}>
                {searchResults.map(user => (
                    <Grid
                        direction="row"
                        alignItems="stretch"
                        container
                        key={`item-${user.userId}`}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                    >
                        <ResultCard data={user} />
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <React.Fragment>
            {paginationEnabled && (
                <Box p={2} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1">{searchResultsCount} results</Typography>

                    <Box p={2} display="flex" flexDirection="row" justifyContent="flex-end">
                        <Pagination />
                    </Box>
                </Box>
            )}
            {renderLoading()}
            {renderResults()}
            {paginationEnabled && (
                <Box p={2} display="flex" flexDirection="row" justifyContent="flex-end">
                    <Pagination />
                </Box>
            )}
        </React.Fragment>
    );
};

const mapState = (state, ownProps) => ({
    searchResults: ownProps.items || RecruitmentSelectors.searchResults(state),
    searchResultsCount: RecruitmentSelectors.searchResultsCount(state),
    loading: RecruitmentSelectors.searchResultsLoading(state),
    filters: RecruitmentSelectors.filters(state),
    pageSize: RecruitmentSelectors.pageSize(state),
    page: RecruitmentSelectors.page(state),
    pageCount: RecruitmentSelectors.pageCount(state),
    paginationEnabled: !ownProps.items
});

const mapDispatch = (dispatch, ownProps) => ({
    updateSearchResults: ownProps.items ? () => {} : () => dispatch(RecruitmentActions.updateSearchResults()),
    setPrevPage: () => dispatch(RecruitmentActions.setPrevPage()),
    setNextPage: () => dispatch(RecruitmentActions.setNextPage())
});

export default connect(
    mapState,
    mapDispatch
)(SearchResults);
