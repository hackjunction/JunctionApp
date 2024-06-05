import React, { useCallback, useEffect, useState } from 'react'

import { Grid, Box, Dialog } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import ProjectDetail from 'components/projects/ProjectDetail'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'
import * as SnackbarActions from 'redux/snackbar/actions'

import WinnerVoteService from 'services/winnerVote'
import _ from 'lodash'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(false)

    const [projects, setProjects] = useState([])

    const update = useCallback(async () => {
        try {
            setLoading(true)
            const finalistProjectsWithAllVotes =
                await WinnerVoteService.getResults(idToken, event.slug)
            if (
                Array.isArray(finalistProjectsWithAllVotes) &&
                finalistProjectsWithAllVotes.length > 0
            ) {
                setProjects(finalistProjectsWithAllVotes)
            }
        } catch (error) {
            console.error(error)
            dispatch(
                SnackbarActions.error(
                    `Error retrieving the voting data: ${
                        error.response.data.message || error.message
                    }`,
                ),
            )
        } finally {
            setLoading(false)
        }
    }, [event])

    useEffect(() => {
        if (event?.slug) {
            update()
        }
    }, [event])

    const getScoreText = project => {
        const scoreFromUsers = project?.votingData?.userVotes ?? 0
        const scoreFromTokenVoters = project?.votingData?.tokenVotes ?? 0
        const total = project?.votingData?.totalVotes ?? 0
        return (
            <>
                <strong>Total votes received: {total}</strong> <br />
                Participant votes: {scoreFromUsers} <br />
                Token votes: {scoreFromTokenVoters}
            </>
        )
    }
    return (
        <PageWrapper loading={loading}>
            <PageHeader heading="Results" subheading="Finalist vote results" />
            <Grid container spacing={3}>
                {projects.map((project, index) => (
                    <ProjectsGridItem
                        key={index}
                        project={project}
                        event={event}
                        votingResults={getScoreText(project)}
                        onClickMore={() => setSelected(project)}
                        showScore={true}
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
