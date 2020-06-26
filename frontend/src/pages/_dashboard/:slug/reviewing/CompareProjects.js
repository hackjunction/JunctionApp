import React, { useState, useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
    Grid,
    Typography,
    CircularProgress,
    Box,
    Dialog,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import Button from 'components/generic/Button'
import ConfirmDialog from 'components/generic/ConfirmDialog'
import Markdown from 'components/generic/Markdown'
import ProjectDetail from 'components/projects/ProjectDetail'
import VoteTimer from './VoteTimer'

import GavelService from 'services/reviewing/gavel'

export default ({ annotator, prevId, nextId, isFirstChoice }) => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [projects, setProjects] = useState()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selected, setSelected] = useState(false)
    const { t } = useTranslation()

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const [prev, next] = await Promise.all([
                GavelService.getProjectDetails(idToken, prevId),
                GavelService.getProjectDetails(idToken, nextId),
            ])
            setProjects({ prev, next })
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Please reload the page'
                )
            )

            setError(true)
        }
        setLoading(false)
    }, [idToken, prevId, nextId, dispatch])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const handlePrevVote = useCallback(() => {
        setLoading(true)
        try {
            dispatch(DashboardActions.submitVote(event.slug, prevId))
        } catch (err) {
            dispatch('Something went wrong... Please try again')
        }
    }, [dispatch, event.slug, prevId])

    const handleNextVote = useCallback(() => {
        setLoading(true)
        try {
            dispatch(DashboardActions.submitVote(event.slug, nextId))
        } catch (err) {
            dispatch('Something went wrong... Please try again')
        }
    }, [dispatch, event.slug, nextId])

    const handleSkip = useCallback(() => {
        setLoading(true)
        try {
            dispatch(DashboardActions.skipProject(event.slug))
        } catch (err) {
            dispatch('Something went wrong... Please try again')
        }
    }, [dispatch, event.slug])

    const renderTop = () => {
        if (isFirstChoice) {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        {t('Gavel_vote_')}
                    </Typography>
                    <Markdown
                        source={
                            event.eventType === 'physical'
                                ? t('Gavel_compare_projects_physical_')
                                : t('Gavel_compare_projects_online_')
                        }
                    />
                </Box>
            )
        } else {
            return (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        {t('Gavel_next_')}
                    </Typography>
                    <Typography
                        align="center"
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                        gutterBottom
                    >
                        {t('Gavel_vote_count_')}{' '}
                        {annotator.ignore.length - annotator.skipped.length - 1}
                    </Typography>
                    <Markdown
                        source={
                            event.eventType === 'physical'
                                ? t('Gavel_compare_projects_physical2_')
                                : t('Gavel_compare_projects_online2_')
                        }
                    />
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
                                    {t('Previous_')}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    onClick={handleNextVote}
                                    color="theme_success"
                                    variant="contained"
                                    fullWidth
                                >
                                    {t('Current_')}
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
