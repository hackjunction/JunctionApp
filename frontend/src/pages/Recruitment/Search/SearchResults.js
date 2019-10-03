import React, { useState, useEffect } from 'react';
import RecruitmentUserModal from 'components/modals/RecruitmentUserModal';

import { connect } from 'react-redux';

import { Paper, Box, List, ListItem, ListItemText } from '@material-ui/core';

import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const SearchResults = ({ searchResults }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected('5d5a860fdc07b6002b2329d2');
  });

  return (
    <React.Fragment>
      <List>
        {searchResults.map(item => (
          <Box mb={1} key={item._id}>
            <Paper>
              <ListItem>
                <ListItemText
                  primary={item.firstName}
                  secondary={item.lastName}
                />
              </ListItem>
            </Paper>
          </Box>
        ))}
      </List>
      <RecruitmentUserModal
        registrationId={selected}
        event={event}
        idToken={
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpCI6Ik5FWkZOa1U1TWtZMk1EWkNRelZGUVRGQ1JVWkZOVGRDUkVVNFF6SkdSRVZFTTBSRFJrWXdSZyJ9'
        }
      />
    </React.Fragment>
  );
};

const mapState = state => ({
  searchResults: RecruitmentSelectors.searchResults(state)
});

export default connect(mapState)(SearchResults);
