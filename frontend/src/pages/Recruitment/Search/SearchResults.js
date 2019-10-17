import React, { useState } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';

import { connect } from 'react-redux';

import { Paper, Box, List, ListItem, ListItemText } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import { Typography } from 'antd';

const SearchResults = ({ searchResults, searchResultsCount }) => {
    const [selected, setSelected] = useState();

    console.log('SEARCH RESULTS', searchResults);

    return (
        <React.Fragment>
            <Typography variant="h6">{searchResultsCount} results</Typography>
            <List>
                {searchResults.map(item => (
                    <Box mb={1} key={item._id}>
                        <Paper>
                            <ListItem onClick={e => setSelected(item.userId)}>
                                <ListItemText primary={item.firstName} secondary={item.lastName} />
                            </ListItem>
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
    searchResultsCount: RecruitmentSelectors.searchResultsCount(state)
});

export default connect(mapState)(SearchResults);
