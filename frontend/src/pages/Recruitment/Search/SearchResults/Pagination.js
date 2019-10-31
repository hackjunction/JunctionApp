import React from 'react';

import { connect } from 'react-redux';
import { Box, Typography, IconButton, CircularProgress } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';

const Pagination = ({ currentPage, pageSize, totalResults, totalPages, setPage, loading }) => {
    return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton disabled={loading || currentPage === 0} onClick={() => setPage(currentPage - 1)}>
                <ChevronLeftIcon />
            </IconButton>
            <Box padding={1}>
                {totalResults === 0 && loading ? (
                    <CircularProgress size={24} />
                ) : (
                    <Typography variant="overline">
                        Page {currentPage + 1} of {totalPages}
                    </Typography>
                )}
            </Box>
            <IconButton disabled={loading || currentPage + 1 === totalPages} onClick={() => setPage(currentPage + 1)}>
                <ChevronRightIcon />
            </IconButton>
        </Box>
    );
};

const mapState = state => ({
    currentPage: RecruitmentSelectors.page(state),
    totalPages: RecruitmentSelectors.pageCount(state),
    totalResults: RecruitmentSelectors.searchResultsCount(state),
    pageSize: RecruitmentSelectors.pageSize(state),
    loading: RecruitmentSelectors.searchResultsLoading(state)
});

const mapDispatch = dispatch => ({
    setPageSize: pageSize => dispatch(RecruitmentActions.setPageSize(pageSize)),
    setPage: page => dispatch(RecruitmentActions.setPage(page))
});

export default connect(
    mapState,
    mapDispatch
)(Pagination);
