import React, { useState, useCallback, useEffect } from 'react'

import { connect } from 'react-redux'
import {
    Grid,
    Typography,
    CircularProgress,
    Box,
    Dialog,
} from '@material-ui/core'
import { withSnackbar } from 'notistack'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import Button from 'components/generic/Button'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import Markdown from 'components/generic/Markdown'
import ProjectDetail from 'components/projects/ProjectDetail'
import VoteTimer from './VoteTimer'

import instructionsPhysical from './compareprojects-physical.md'
import instructionsPhysical2 from './compareprojects-physical-2.md'
import instructionsOnline from './compareprojects-online.md'
import instructionsOnline2 from './compareprojects-online-2.md'

import GavelService from 'services/reviewing/gavel'

const CompareProjects = ({
    annotator,
    prevId,
    nextId,
    isFirstChoice,
    event,
    enqueueSnackbar,
    idToken,
    submitVote,
    skipProject,
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [projects, setProjects] = useState()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const [instructions, setInstructions] = useState('')

    useEffect(() => {
        if (isFirstChoice) {
            const path =
                event.eventType === 'physical'
                    ? instructionsPhysical
                    : instructionsOnline
            fetch(path)
                .then(response => response.text())
                .then(setInstructions)
        } else {
            const path =
                event.eventType === 'physical'
                    ? instructionsPhysical2
                    : instructionsOnline2
            fetch(path)
                .then(response => response.text())
                .then(setInstructions)
        }
    }, [event.eventType, isFirstChoice])

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const [prev, next] = await Promise.all([
                GavelService.getProjectDetails(idToken, prevId),
                GavelService.getProjectDetails(idToken, nextId),
            ])
            setProjects({ prev, next })
        } catch (err) {
            enqueueSnackbar(
                'Oops, something went wrong... Please reload the page',
                { variant: 'error' }
            )
            setError(true)
        }
        setLoading(false)
    }, [idToken, prevId, nextId, enqueueSnackbar])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const handlePrevVote = useCallback(() => {
        setLoading(true)
        try {
            submitVote(event.slug, prevId)
        } catch (err) {
            enqueueSnackbar('Something went wrong... Please try again')
        }
    }, [event.slug, prevId, submitVote, enqueueSnackbar])

    const handleNextVote = useCallback(() => {
        setLoading(true)
        try {
            submitVote(event.slug, nextId)
        } catch (err) {
            enqueueSnackbar('Something went wrong... Please try again')
        }
    }, [event.slug, nextId, submitVote, enqueueSnackbar])

    const handleSkip = useCallback(() => {
        setLoading(true)
        try {
            skipProject(event.slug)
        } catch (err) {
            enqueueSnackbar('Something went wrong... Please try again')
        }
    }, [event.slug, skipProject, enqueueSnackbar])

    const renderTop = () => {
        if (isFirstChoice) {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        Okay, time to vote!
                    </Typography>
                    <Markdown source={instructions} />
                </Box>
            )
        } else {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        Next decision
                    </Typography>
                    <Typography
                        align="center"
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                        gutterBottom
                    >
                        Your votes:{' '}
                        {annotator.ignore.length - annotator.skipped.length - 1}
                    </Typography>
                    <Markdown source={instructions} />
                </Box>
            )
        }
    }

    const renderCard = () => {
        if (loading) {
            return (
                <Box
                    p={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <CircularProgress />
                </Box>
            )
        }

        if (error || !projects) {
            return (
                <Box p={3} display="flex" flexDirection="column" alignItems>
                    <Typography variant="subtitle1" textAlign="center">
                        Oops, something went wrong... Please refresh the page to
                        try again
                    </Typography>
                </Box>
            )
        }

        return (
            <Grid container spacing={3} direction="row" justify="center">
                <ProjectsGridItem
                    project={projects.prev.project}
                    event={event}
                    showTableLocation={true}
                    label="Previous"
                    labelBackground="theme_turquoise"
                    onClickMore={() => setSelected(projects.prev.project)}
                />
                <ProjectsGridItem
                    project={projects.next.project}
                    event={event}
                    showTableLocation={true}
                    label="Current"
                    labelBackground="theme_success"
                    onClickMore={() => setSelected(projects.next.project)}
                />
                <Grid item xs={12} md={8}>
                    <VoteTimer annotator={annotator}>
                        <Grid container spacing={3} direction="row">
                            <Grid item xs={6}>
                                <Button
                                    onClick={handlePrevVote}
                                    color="theme_turquoise"
                                    variant="contained"
                                    fullWidth
                                >
                                    Previous
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={handleNextVote}
                                    color="theme_success"
                                    variant="contained"
                                    fullWidth
                                >
                                    Current
                                </Button>
                            </Grid>
                            {event.eventType === 'physical' && (
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        textAlign="center"
                                    >
                                        <Button
                                            onClick={() => setConfirmOpen(true)}
                                            color="theme_lightgray"
                                            variant="outlined"
                                        >
                                            I can't find{' '}
                                            {projects.next.project.name}
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </VoteTimer>
                </Grid>
                <ConfirmDialog
                    open={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    onCancel={() => {}}
                    onOk={handleSkip}
                    title="Are you sure?"
                    message="Have you looked around carefully for the project? Try to check nearby tables if you can find the team there. If you really can't find them, you can skip the project."
                    cancelText="Cancel"
                    okText="OK"
                />
                <Dialog
                    transitionDuration={0}
                    fullScreen
                    open={Boolean(selected)}
                    onClose={() => setSelected()}
                >
                    <ProjectDetail
                        project={selected}
                        event={event}
                        onBack={() => setSelected()}
                        showTableLocation={false}
                    />
                </Dialog>
            </Grid>
        )
    }

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
    )
}

const mapState = state => ({
    event: DashboardSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state),
})

const mapDispatch = dispatch => ({
    submitVote: (slug, winnerId) =>
        dispatch(DashboardActions.submitVote(slug, winnerId)),
    skipProject: slug => dispatch(DashboardActions.skipProject(slug)),
})

export default withSnackbar(connect(mapState, mapDispatch)(CompareProjects))
