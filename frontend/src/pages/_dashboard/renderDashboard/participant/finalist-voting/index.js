import React, { useCallback, useEffect, useState } from 'react'

import { Grid, Box, Button, Dialog } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import Select from 'components/inputs/Select'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import ProjectDetail from 'components/projects/ProjectDetail'

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
    const [selected, setSelected] = useState(false)

    const [projects, setProjects] = useState([])
    const [vote, setVote] = useState(null)
    const [hasVoted, setVoted] = useState(false)

    const getCurrentVote = useCallback(() => {
        return WinnerVoteService.getVote(idToken, event.slug)
    }, [idToken, event])

    const getFinalists = useCallback(async () => {
        setLoading(true)
        EventsService.getFinalists(idToken, event.slug)
            .then(finalistProjects => {
                setProjects(finalistProjects)
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong... Please try again',
                    ),
                )
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [idToken, event])

    useEffect(() => {
        getFinalists()
        update()
    }, [])

    const update = useCallback(async () => {
        try {
            setLoading(true)
            const vote = await getCurrentVote()
            if (vote) {
                setVote(vote.project)
                setVoted(true)
            }
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Something went wrong... Please try again',
                ),
            )
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [event, idToken])

    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true)
            const result = await WinnerVoteService.submitVote(
                idToken,
                event.slug,
                vote,
            )
            if (result) {
                dispatch(SnackbarActions.success('Vote submitted!'))
            }
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Something went wrong... Please try again',
                ),
            )
        } finally {
            setLoading(false)
        }
    }, [idToken, event, vote])
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
                        {hasVoted ? 'Change vote' : 'Submit vote'}
                    </Button>
                </Box>
            </Box>
            <Grid container spacing={3}>
                {projects.map((project, index) => (
                    <ProjectsGridItem
                        key={index}
                        project={project}
                        event={event}
                        onClickMore={() => setSelected(project)}
                    />
                ))}
            </Grid>
            <Box height="200px" />
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
        </PageWrapper>
    )
}
