import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';

import { connect } from 'react-redux';

import { Paper, Box, List, ListItem, ListItemText } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';
import ResultCard from './ResultCard';

const SearchResults = ({ searchResults }) => {
    const [selected, setSelected] = useState();

    console.log(searchResults);
    return (
        <React.Fragment>
            <List>
                {searchResults.map(item => (
                    <Box mb={1} key={`box-${item.userId}`}>
                        <ResultCard
                            data={item}
                            onClick={() => setSelected(item.userId)}
                        />
                    </Box>
                ))}
            </List>
            <RecruitmentUserModal profileId={selected} onClose={setSelected} />
        </React.Fragment>
    );
};

const mapState = state => ({
    searchResults: RecruitmentSelectors.searchResults(state)
});

export default connect(mapState)(SearchResults);
