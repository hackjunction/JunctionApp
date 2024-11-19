import React, { useCallback, useEffect, useState } from 'react'

import { Grid, Box, Button, Dialog, Card, Typography } from '@material-ui/core'
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
    const [currentVote, setCurrentVote] = useState(null)
    const [hasVoted, setHasVoted] = useState(false)
    const [newVote, setNewVote] = useState(null)

    const getCurrentVote = async () => {
        return WinnerVoteService.getVote(idToken, event.slug)
    }

    const getFinalists = async () => {
        EventsService.getFinalists(idToken, event.slug)
            .then(finalistProjects => {
                setProjects(finalistProjects)
            })
            .catch(err => {
                dispatch(
                    SnackbarActions.error(
                        'Something went wrong while fetching finalists, refresh the page to try again.',
                    ),
                )
            })
    }

    useEffect(() => {
        setLoading(true)
        try {
            getFinalists()
            update()
        } catch (err) {
        } finally {
            setLoading(false)
        }
    }, [])

    const update = async () => {
        try {
            const currentVoteFetched = await getCurrentVote()
            if (currentVoteFetched && currentVoteFetched?.project) {
                setCurrentVote(currentVoteFetched.project)
                setNewVote(currentVoteFetched.project)
                setHasVoted(true)
            }
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    'Something went wrong while fetching your vote, refresh the page to try again.',
                ),
            )
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const result = await WinnerVoteService.submitVote(
                idToken,
                event.slug,
                newVote,
            )
            if (result) {
                setCurrentVote(newVote)
                setHasVoted(true)
                dispatch(SnackbarActions.success('vote submitted!'))
            }
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    `Your vote could not be saved. Error: ${
                        err.response.data.message || err.message
                    }`,
                ),
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageWrapper loading={loading}>
            <PageHeader
                heading="Finalist voting"
                subheading="Vote for your favorite project of the finalists"
            />
            <Box className="tw-p-4 tw-my-4 tw-border-gray-200 tw-border-solid tw-rounded-md">
                {projects &&
                    currentVote &&
                    projects.find(project => project._id === currentVote) && (
                        <div className="tw-mb-2">
                            <Typography variant="subtitle1">
                                Your current choice is:{' '}
                                {
                                    projects.find(
                                        project => project._id === currentVote,
                                    ).name
                                }
                            </Typography>
                        </div>
                    )}
                <div className="tw-flex tw-flex-col tw-w-full tw-gap-2">
                    <Select
                        value={newVote ? newVote : currentVote}
                        onChange={setNewVote}
                        label="Choose your favorite"
                        options={projects.map(project => ({
                            label: project.name,
                            value: project._id,
                        }))}
                    />
                    <Button
                        disabled={newVote === currentVote}
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                    >
                        {hasVoted ? 'Change vote' : 'Submit vote'}
                    </Button>
                </div>
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
