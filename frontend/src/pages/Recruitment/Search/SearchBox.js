import React from 'react';

import { connect } from 'react-redux';
import { Paper, Box, Grid, Button, CircularProgress, Typography, Divider } from '@material-ui/core';
import * as RecruitmentActions from 'redux/recruitment/actions';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const SearchBox = ({ loading, updateSearchResults }) => {
    return (
        <Paper>
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Search participants</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Divider />
                    </Grid>
                </Grid>
            </Box>
            <Box p={3} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                {loading && <CircularProgress size={24} />}
                {!loading && (
                    <Button variant="contained" color="primary" onClick={updateSearchResults}>
                        Search
                    </Button>
                )}
            </Box>
        </Paper>
    );
};

const mapState = state => ({
    loading: RecruitmentSelectors.searchResultsLoading(state)
});

const mapDispatch = dispatch => ({
    updateSearchResults: () => dispatch(RecruitmentActions.updateSearchResults())
});

export default connect(
    mapState,
    mapDispatch
)(SearchBox);
