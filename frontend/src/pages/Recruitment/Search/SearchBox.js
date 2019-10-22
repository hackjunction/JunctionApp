import React from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Button, Typography } from '@material-ui/core';
import * as RecruitmentActions from 'redux/recruitment/actions';
import * as RecruitmentSelectors from 'redux/recruitment/selectors';

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        overflow: 'auto',
        padding: theme.spacing(2)
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold'
    },
    sectionTitle: {
        fontSize: '0.9rem'
    }
}));

const SearchBox = ({ loading, updateSearchResults }) => {
    const classes = useStyles();
    return (
        <Box flex="1" width="100%" display="flex" flexDirection="column">
            <Box className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="button" className={classes.title}>
                            Filters
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="overline" className={classes.sectionTitle}>
                            Skills
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="overline" className={classes.sectionTitle}>
                            Roles
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="overline" className={classes.sectionTitle}>
                            Country of residence
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box p={2}>
                <Button disabled={loading} fullWidth variant="contained" color="primary" onClick={updateSearchResults}>
                    Search
                </Button>
            </Box>
        </Box>
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
