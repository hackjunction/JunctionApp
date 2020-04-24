import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, Typography, Chip, Box, Grid } from '@material-ui/core'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

import ProjectScoreModal from 'components/modals/ProjectScoreModal'
import Button from 'components/generic/Button'

export default props => {
    const event = useSelector(DashboardSelectors.event)
    const projects = useSelector(DashboardSelectors.projects)
    const projectScores = useSelector(DashboardSelectors.projectScores)

    const projectSelectedCallback = props.projectSelectedCallback

    const [selectedProjectScore, setSelectedProjectStore] = useState(null)
    const [projectScoreModalOpen, setProjectScoreModalOpen] = useState(false)

    const [
        challengeAndTrackSlugState,
        setChallengeAndTrackSlugState,
    ] = useState({})

    useEffect(() => {
        let challengeAndTrackSlugToNameMap = {}
        if (event && event.challenges) {
            event.challenges.forEach(challenge => {
                challengeAndTrackSlugToNameMap[challenge.slug] = challenge.name
            })
        }
        if (event && event.tracks) {
            event.tracks.forEach(
                track =>
                    (challengeAndTrackSlugToNameMap[track.slug] = track.name)
            )
        }
        setChallengeAndTrackSlugState(challengeAndTrackSlugToNameMap)
    }, [event])

    useEffect(() => {
        if (projectScoreModalOpen) {
            setSelectedProjectStore(
                projectScores.find(s => s._id === selectedProjectScore._id)
            )
        }
    }, [projectScoreModalOpen, projectScores, selectedProjectScore])

    const showProjectScore = project => {
        const score = projectScores.find(
            score => score.project._id === project._id
        )
        setSelectedProjectStore(score)
        setProjectScoreModalOpen(true)
    }

    // Checks whether there are more unique challenges that the competitor has not submitted
    // a solution to yet.
    const canAddMoreSubmissions = () => {
        if (event && event.challenges && projects) {
            const challengesWithSubmittedProjects = [].concat.apply(
                [],
                projects.map(project => project.challenges)
            )
            return (
                event.challenges.filter(
                    challenge =>
                        challengesWithSubmittedProjects.indexOf(
                            challenge.slug
                        ) < 0
                ).length > 0
            )
        }
        return false
    }
    const ProjectCard = props => {
        const project = props.project
        return (
            <Grid item xs={12} md={6}>
                <Paper elevation={1}>
                    <Box p={2}>
                        <Typography variant="h4" gutterBottom>
                            {project.name}
                        </Typography>

                        <Box m={1} mb={2}>
                            {project.track && (
                                <Chip
                                    color="primary"
                                    label={
                                        challengeAndTrackSlugState[
                                            project.track
                                        ]
                                    }
                                    style={{ margin: '3px' }}
                                ></Chip>
                            )}
                            {project.challenges &&
                                project.challenges.map(challenge => (
                                    <Chip
                                        label={
                                            challengeAndTrackSlugState[
                                                challenge
                                            ]
                                        }
                                        style={{ margin: '3px' }}
                                        key={challenge}
                                    />
                                ))}
                        </Box>
                        <Button
                            variant="contained"
                            color="theme_turquoise"
                            onClick={() => projectSelectedCallback(project._id)}
                            style={{ marginRight: '6px' }}
                        >
                            Edit Submission
                        </Button>
                        <Button
                            variant="contained"
                            color="theme_orange"
                            onClick={() => showProjectScore(project)}
                        >
                            View Score
                        </Button>
                    </Box>
                </Paper>
            </Grid>
        )
    }
    return (
        <Grid container spacing={1}>
            {projects &&
                projects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            {/* TODO revork in settings canAddMoreSubmissions()*/ true && (
                <Grid item xs={12} md={6}>
                    <Paper elevation={3}>
                        <Box
                            p={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <Typography
                                variant="body1"
                                align="center"
                                gutterBottom
                            >
                                This event allows multiple submissions! Add a
                                new one now!
                            </Typography>
                            <Box p={1} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => projectSelectedCallback(null)}
                            >
                                Add submission
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            )}

            <ProjectScoreModal
                score={selectedProjectScore}
                open={projectScoreModalOpen}
                onClose={() => setProjectScoreModalOpen(false)}
            />
        </Grid>
    )
}
