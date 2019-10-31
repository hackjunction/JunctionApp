import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';

import { Grid, Box, Button } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import Pagination from './Pagination';
import LoadingCard from './LoadingCard';

const SearchResults = ({
    searchResults,
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

    useEffect(() => {
        updateSearchResults();
    }, [pageSize, page, filters, updateSearchResults]); //eslint-disable-line
    console.log(searchResults)
    return (
        <React.Fragment>
            <Pagination />
            {loading ? (
                <React.Fragment>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                </React.Fragment>
            ) : (
                    <React.Fragment>


                        <Grid direction="row" alignItems="stretch" container spacing={3}>
                            {searchResults.map(item => (
                                <Grid direction="row" alignItems="stretch" container key={`item-${item.userId}`} item xs={12} sm={6} md={4} lg={3} >
                                    <ResultCard
                                        data={item}
                                        onClick={e => setSelected(item.userId)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </React.Fragment>
                )}
            {pageCount > 0 && (
                <Box
                    mt={2}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Button
                        disabled={loading || page === 0}
                        color="primary"
                        variant="contained"
                        onClick={setPrevPage}
                    >
                        Previous page
          </Button>
                    <Button
                        disabled={loading || page + 1 === pageCount}
                        color="primary"
                        variant="contained"
                        onClick={setNextPage}
                    >
                        Next page
          </Button>
                </Box>
            )}
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
