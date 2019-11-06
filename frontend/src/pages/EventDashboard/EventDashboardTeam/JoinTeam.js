import React, { useState, useCallback } from 'react';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography, CircularProgress } from '@material-ui/core';
import { withSnackbar } from 'notistack';

import TextInput from 'components/inputs/TextInput';
import Button from 'components/generic/Button';

import * as DashboardActions from 'redux/dashboard/actions';
import * as DashboardSelectors from 'redux/dashboard/selectors';

const useStyles = makeStyles(theme => ({
    box: {
        background: 'white',
        padding: theme.spacing(3),
        borderRadius: '12px',
        boxShadow: '4px 6px 20px #F3F3F3',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

const JoinTeam = ({ enqueueSnackbar, createTeam, joinTeam, event }) => {
    const classes = useStyles();
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState('');

    const handleCreate = useCallback(() => {
        setLoading(true);
        createTeam(event.slug)
            .then(() => {
                enqueueSnackbar('Created new team');
            })
            .catch(err => {
                enqueueSnackbar('Something went wrong... please try again.', { variant: 'error' });
            });
    }, [createTeam, event.slug, enqueueSnackbar]);

    const handleJoin = useCallback(() => {
        setLoading(true);
        joinTeam(event.slug, code)
            .then(() => {
                enqueueSnackbar('Joined team ' + code, { variant: 'success' });
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    enqueueSnackbar('No team found with code ' + code, { variant: 'error' });
                } else if (err.response && err.response.status === 403) {
                    enqueueSnackbar('Unable to join team: ' + (err.response.data ? err.response.data.message : ''), {
                        variant: 'error'
                    });
                } else {
                    enqueueSnackbar('Something went wrong... please try again.', { variant: 'error' });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [code, event.slug, joinTeam, enqueueSnackbar]);

    return (
        <Box>
            <Typography variant="body1">
                It seems like you don’t have a team yet. Here you can create a new team or join already existing one.
            </Typography>
            <Box mt={2} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Join an existing team
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            If one of your team members has already created a team, all you need to do is fill in the
                            team code here.
                        </Typography>
                        <Box
                            mt={2}
                            width="200px"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <TextInput value={code} onChange={setCode} label="Your team code here" />
                            <Box p={1} />
                            <Button
                                loading={loading}
                                disabled={code.length === 0}
                                onClick={handleJoin}
                                fullWidth
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Join team
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box className={classes.box}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Create a new team
                        </Typography>
                        <Typography variant="body1" align="center" gutterBottom>
                            You can also create a new team, and you'll be given a unique team code. You can then share
                            this code with people you want to invite to your team.
                        </Typography>
                        <Box mt={2} width="200px" display="flex" alignItems="center" justifyContent="center">
                            <Button
                                loading={loading}
                                onClick={handleCreate}
                                fullWidth
                                color="theme_turquoise"
                                variant="contained"
                            >
                                Create team
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state)
});

const mapDispatch = dispatch => ({
    createTeam: slug => dispatch(DashboardActions.createTeam(slug)),
    joinTeam: (slug, code) => dispatch(DashboardActions.joinTeam(slug, code))
});

export default withSnackbar(
    connect(
        mapState,
        mapDispatch
    )(JoinTeam)
);
