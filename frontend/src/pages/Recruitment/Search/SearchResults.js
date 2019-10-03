import React from 'react';

import { connect } from 'react-redux';

import { Paper, Box, List, ListItem, ListItemText } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const SearchResults = ({ searchResults }) => {
    return (
        <List>
            {searchResults.map(item => (
                <Box mb={1}>
                    <Paper key={item._id}>
                        <ListItem key={item._id}>
                            <ListItemText primary={item.firstName} secondary={item.lastName} />
                        </ListItem>
                    </Paper>
                </Box>
            ))}
        </List>
    );
};

const mapState = state => ({
    searchResults: RecruitmentSelectors.searchResults(state)
});

export default connect(mapState)(SearchResults);
