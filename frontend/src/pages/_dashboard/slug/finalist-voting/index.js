import React, { useCallback, useEffect, useState } from 'react'

import { Grid, Box, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import Select from 'components/inputs/Select'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'
import EventsService from 'services/events'

import WinnerVoteService from 'services/winnerVote'

export default () => {
    const dispatch = useDispatch()
    const event = useSelector(DashboardSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)

    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [vote, setVote] = useState([])

    const updateVote = useCallback(() => {
        return WinnerVoteService.getVote(idToken, event.slug)
    }, [idToken, event])

    const updateProjects = useCallback(() => {
        return EventsService.getWinnerProjects(idToken, event.slug)
    }, [idToken, event])

    const update = useCallback(async () => {
        setLoading(true)
        try {
            const [vote, projects] = await Promise.all([
                updateVote(),
                updateProjects(),
            ])
            setProjects(projects)
            if (vote) {
                setVote(vote.project)
            }
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Oops, something went wrong... Please reload the page.',
                ),
            )
        } finally {
            setLoading(false)
        }
    }, [updateVote, updateProjects, dispatch])

    useEffect(() => {
        update()
    }, [update])

    const handleSubmit = useCallback(async () => {
        setLoading(true)
        try {
            const result = await WinnerVoteService.submitVote(
                idToken,
                event.slug,
                vote,
            )
            setVote(result.project)
            dispatch(SnackbarActions.success('Vote submitted!'))
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Something went wrong... Please try again',
                ),
            )
        }
        setLoading(false)
    }, [idToken, event.slug, vote, dispatch])

    return (
        <PageWrapper loading={loading}>
            <PageHeader
                heading="Finalist voting"
                subheading="Vote for your favorite project of the finalists"
            />
            <Box
                mt={5}
                mb={3}
                display="flex"
                flexDirection="row"
                alignItems="flex-end"
            >
                <Box mb={2} flex="1">
                    <Select
                        value={vote}
                        onChange={setVote}
                        label="Choose your favorite"
                        options={projects.map(project => ({
                            label: project.name,
                            value: project._id,
                        }))}
                    />
                </Box>
                <Box ml={2} mb={2}>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        Submit vote
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {projects.map(project => (
                    <ProjectsGridItem project={project} event={event} />
                ))}
            </Grid>
            <Box height="200px" />
        </PageWrapper>
    )
}
