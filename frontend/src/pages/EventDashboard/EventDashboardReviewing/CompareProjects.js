import React, { useState, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { Grid, Typography, CircularProgress, Box } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardActions from 'redux/dashboard/actions';
import ProjectsGridItem from 'components/projects/ProjectsGridItem';
import Button from 'components/generic/Button';
import ConfirmDialog from 'components/generic/ConfirmDialog';
import VoteTimer from './VoteTimer';

import GavelService from 'services/reviewing/gavel';

const CompareProjects = ({
    annotator,
    prevId,
    nextId,
    isFirstChoice,
    event,
    enqueueSnackbar,
    idToken,
    submitVote,
    skipProject
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [projects, setProjects] = useState();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const [prev, next] = await Promise.all([
                GavelService.getProjectDetails(idToken, prevId),
                GavelService.getProjectDetails(idToken, nextId)
            ]);
            setProjects({ prev, next });
        } catch (err) {
            enqueueSnackbar('Oops, something went wrong... Please reload the page', { variant: 'error' });
            setError(true);
        }
        setLoading(false);
    }, [idToken, prevId, nextId, enqueueSnackbar]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handlePrevVote = useCallback(() => {
        submitVote(event.slug, prevId);
    }, [event.slug, prevId, submitVote]);

    const handleNextVote = useCallback(() => {
        submitVote(event.slug, nextId);
    }, [event.slug, nextId, submitVote]);

    const renderTop = () => {
        if (isFirstChoice) {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        Okay, time to vote!
                    </Typography>
                    <Typography align="center" variant="body1">
                        Now that you've seen your first project, you should go and see the next one. Find the project
                        under NEXT, listen to their demo, and make a decision. Which one was better in your opinion -
                        the first project or the one you just saw?
                    </Typography>
                </Box>
            );
        } else {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        Next decision
                    </Typography>
                    <Typography align="center" variant="body1">
                        Make your way to the next project, and after you've seen it, make a decision. Remember: you are
                        always comparing your current project to the one you saw immediately before it - regardless of
                        who won the previous comparison!
                    </Typography>
                </Box>
            );
        }
    };

    const renderCard = () => {
        if (loading) {
            return (
                <Box p={3} display="flex" flexDirection="column" alignItems="center">
                    <CircularProgress />
                </Box>
            );
        }

        if (error || !projects) {
            return (
                <Box p={3} display="flex" flexDirection="column" alignItems>
                    <Typography variant="subtitle1" textAlign="center">
                        Oops, something went wrong... Please refresh the page to try again
                    </Typography>
                </Box>
            );
        }

        return (
            <Grid container spacing={3} direction="row" justify="center">
                <ProjectsGridItem
                    project={projects.prev.project}
                    event={event}
                    showTableLocation={true}
                    label="Previous"
                    labelBackground="theme_turquoise"
                />
                <ProjectsGridItem
                    project={projects.next.project}
                    event={event}
                    showTableLocation={true}
                    label="Next"
                    labelBackground="theme_success"
                />
                <Grid item xs={12} md={8}>
                    <VoteTimer annotator={annotator}>
                        <Grid container spacing={3} direction="row">
                            <Grid item xs={6}>
                                <Button onClick={handlePrevVote} color="theme_turquoise" variant="contained" fullWidth>
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleNextVote} color="theme_success" variant="contained" fullWidth>
                                    Current
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" flexDirection="column" textAlign="center">
                                    <Button
                                        onClick={() => setConfirmOpen(true)}
                                        color="theme_lightgray"
                                        variant="outlined"
                                    >
                                        I can't find {projects.next.project.name}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </VoteTimer>
                </Grid>
                <ConfirmDialog
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onCancel={() => {}}
                    onOk={() => skipProject(event.slug)}
                    title="Are you sure?"
                    message="Have you looked around carefully for the project? Try to check nearby tables if you can find the team there. If you really can't find them, you can skip the project."
                    cancelText="Cancel"
                    okText="OK"
                />
            </Grid>
        );
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {renderTop()}
            </Grid>
            <Grid item xs={12}>
                {renderCard()}
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: DashboardSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

const mapDispatch = dispatch => ({
    submitVote: (slug, winnerId) => dispatch(DashboardActions.submitVote(slug, winnerId)),
    skipProject: slug => dispatch(DashboardActions.skipProject(slug))
});

export default withSnackbar(connect(mapState, mapDispatch)(CompareProjects));
