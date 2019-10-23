import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';

import { Paper, Box, List, Button } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

import Pagination from './Pagination';

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

    useEffect(() => {
        updateSearchResults();
    }, [pageSize, page, filters, updateSearchResults]); //eslint-disable-line

    return (
        <React.Fragment>
            <Pagination />
            <List>
                {searchResults.map(item => (
                    <Box mb={1} key={item._id}>
                        <Paper>
                            <ResultCard
                                key={`item-${item.userId}`}
                                data={item}
                                onClick={e => setSelected(item.userId)}
                            />
                        </Paper>
                    </Box>
                ))}
            </List>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Button disabled={loading || page === 0} color="primary" variant="contained" onClick={setPrevPage}>
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
