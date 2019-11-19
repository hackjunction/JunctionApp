import React, { useState, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress, Box, Dialog } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardActions from 'redux/dashboard/actions';
import ProjectsGridItem from 'components/projects/ProjectsGridItem';
import Button from 'components/generic/Button';
import Markdown from 'components/generic/Markdown';
import ProjectDetail from 'components/projects/ProjectDetail';

import GavelService from 'services/reviewing/gavel';
import instructionsPhysical from './firstproject-physical.md';
import instructionsOnline from './firstproject-online.md';

const FirstProject = ({ projectId, event, enqueueSnackbar, idToken, onDone }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [project, setProject] = useState();
    const [selected, setSelected] = useState();
    const [instructions, setInstructions] = useState('');

    useEffect(() => {
        const path = event.eventType === 'physical' ? instructionsPhysical : instructionsOnline;
        fetch(path)
            .then(response => response.text())
            .then(text => {
                setInstructions(text);
            });
    }, [event.eventType]);

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

    const handleDone = useCallback(() => {
        setLoading(true);
        try {
            onDone(event.slug);
        } catch (err) {
            enqueueSnackbar('Something went wrong... Please try again.');
        }
    }, [onDone, event.slug, enqueueSnackbar]);

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
                <ProjectsGridItem
                    project={project.project}
                    event={event}
                    showTableLocation={true}
                    onClickMore={() => setSelected(project.project)}
                />
                <Grid item xs={12}>
                    <Button onClick={handleDone} color="theme_turquoise" variant="contained">
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
                    <Markdown source={instructions} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                {renderCard()}
            </Grid>
            <Dialog transitionDuration={0} fullScreen open={Boolean(selected)} onClose={() => setSelected()}>
                <ProjectDetail
                    project={selected}
                    event={event}
                    onBack={() => setSelected()}
                    showTableLocation={false}
                />
            </Dialog>
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
