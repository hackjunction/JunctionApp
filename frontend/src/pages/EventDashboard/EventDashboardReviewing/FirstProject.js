import React, { useState, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardActions from 'redux/dashboard/actions';
import ProjectsGridItem from 'components/projects/ProjectsGridItem';
import Button from 'components/generic/Button';

import GavelService from 'services/reviewing/gavel';

const FirstProject = ({ projectId, event, enqueueSnackbar, idToken, onDone }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [project, setProject] = useState();

    const fetchProject = useCallback(async () => {
        setLoading(true);
        try {
            const data = await GavelService.getProjectDetails(idToken, projectId);
            setProject(data);
        } catch (err) {
            enqueueSnackbar('Oops, something went wrong... Please reload the page', { variant: 'error' });
            setError(true);
        }
        setLoading(false);
    }, [idToken, projectId, enqueueSnackbar]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const renderCard = () => {
        if (loading) {
            return (
                <Box p={3} display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress />
                </Box>
            );
        }

        if (error || !project) {
            return (
                <Box p={3} display="flex" flexDirection="column" alignItems>
                    <Typography variant="subtitle1" textAlign="center">
                        Oops, something went wrong... Please refresh the page to try again
                    </Typography>
                </Box>
            );
        }

        return (
            <Grid container spacing={3} direction="column" alignItems="center">
                <ProjectsGridItem project={project.project} event={event} showTableLocation={true} />
                <Grid item xs={12}>
                    <Button onClick={() => onDone(event.slug)} color="theme_turquoise" variant="contained">
                        Done
                    </Button>
                </Grid>
            </Grid>
        );
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        Your first project
                    </Typography>
                    <Typography align="center" variant="body1">
                        Alright! Time to see your first project! Make your way to the location indicated on the below
                        card. Once you're there and you've found the right team, let them know you've come to review
                        their project. Give them 3 minutes time to demo, and ask any questions you may have - when you
                        think you've seen enough, click DONE.
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {renderCard()}
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

const mapDispatch = dispatch => ({
    onDone: slug => dispatch(DashboardActions.setFirstProjectSeen(slug))
});

export default withSnackbar(connect(mapState, mapDispatch)(FirstProject));
