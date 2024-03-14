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
import * as DashboardActions from 'redux/dashboard/actions'
import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import Button from 'components/generic/Button'
import Markdown from 'components/generic/Markdown'
import ProjectDetail from 'components/projects/ProjectDetail'

import GavelService from 'services/reviewing/gavel'

export default ({ projectId }) => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [project, setProject] = useState()
    const [selected, setSelected] = useState()
    const { t } = useTranslation()

    const fetchProject = useCallback(async () => {
        setLoading(true)
        try {
            const data = await GavelService.getProjectDetails(
                idToken,
                projectId,
            )
            setProject(data)
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Please reload the page',
                ),
            )
            setError(true)
        }
        setLoading(false)
    }, [idToken, projectId, dispatch])

    const handleDone = useCallback(() => {
        setLoading(true)
        try {
            dispatch(DashboardActions.setFirstProjectSeen(event.slug))
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Please reload the page',
                ),
            )
        }
    }, [dispatch, event.slug])

    useEffect(() => {
        fetchProject()
    }, [fetchProject])

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

        if (error || !project) {
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
            <Grid container spacing={3} direction="column" alignItems="center">
                <ProjectsGridItem
                    project={project.project}
                    event={event}
                    showTableLocation={true}
                    onClickMore={() => setSelected(project.project)}
                />
                <Grid item xs={12}>
                    <Button
                        onClick={handleDone}
                        color="primary"
                        variant="contained"
                    >
                        Done
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h4" gutterBottom>
                        {t('Gavel_first_project_title_')}
                    </Typography>
                    <Markdown
                        source={
                            event.eventType === 'physical' ||
                            event.eventType === 'hybrid'
                                ? t('Gavel_first_project_physical_')
                                : t('Gavel_first_project_online_')
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                {renderCard()}
            </Grid>
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
