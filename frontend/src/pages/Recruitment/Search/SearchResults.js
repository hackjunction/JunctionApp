import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';
import ResultCard from './ResultCard';
import { connect } from 'react-redux';

import { Paper, Box, List } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import * as RecruitmentActions from 'redux/recruitment/actions';
import { Typography } from 'antd';

const SearchResults = ({ searchResults, searchResultsCount, updateSearchResults, filters }) => {
    const [selected, setSelected] = useState();

    useEffect(() => {
        updateSearchResults();
    }, [filters, updateSearchResults]); //eslint-disable-line

    return (
        <React.Fragment>
            <Typography variant="h6">{searchResultsCount} results</Typography>
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
            <RecruitmentUserModal profileId={selected} onClose={setSelected} />
        </React.Fragment>
    );
};

const mapState = state => ({
    searchResults: RecruitmentSelectors.searchResults(state),
    searchResultsCount: RecruitmentSelectors.searchResultsCount(state),
    filters: RecruitmentSelectors.filters(state)
});

const mapDispatch = dispatch => ({
    updateSearchResults: () => dispatch(RecruitmentActions.updateSearchResults())
});

export default connect(
    mapState,
    mapDispatch
)(SearchResults);
