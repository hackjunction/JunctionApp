import React, { useCallback, useEffect, useState } from 'react'

import { Grid, Box, Dialog } from '@material-ui/core'
import { useSelector } from 'react-redux'

import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import ProjectsGridItem from 'components/projects/ProjectsGridItem'
import ProjectDetail from 'components/projects/ProjectDetail'

import * as OrganiserSelectors from 'redux/organiser/selectors'
import * as AuthSelectors from 'redux/auth/selectors'

import EventsService from 'services/events'
//import ProjectsService from 'services/projects'

import WinnerVoteService from 'services/winnerVote'
import VotingTokenService from 'services/votingToken'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const idToken = useSelector(AuthSelectors.getIdToken)

    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(false)

    const [projects, setProjects] = useState([])
    const [results, setResults] = useState({})
    const [tokenVoterResults, setTokenVoterResults] = useState([])

    const updateVote = useCallback(() => {
        return WinnerVoteService.getResults(idToken, event.slug)
    }, [idToken, event])

    const updateVotesWithToken = useCallback(() => {
        return VotingTokenService.getVotingTokenResults(
            idToken,
            event.slug,
        ).catch(error => {
            console.error(error?.response)
        })
    }, [idToken, event])

    // const updateProjects = useCallback(() => {
    //     // TODO use EventsService
    //     return ProjectsService.getProjectsByEvent(event.slug)
    //     // return EventsService.getWinnerProjects(idToken, event.slug)
    // }, [event])

    const update = useCallback(async () => {
        setLoading(true)
        if (event.overallReviewMethod === 'finalsManualSelection') {
            const vote = await updateVote()
            const partnerVotes = await updateVotesWithToken()
            const topProjects = await EventsService.getFinalists(
                idToken,
                event.slug,
            )
            setProjects(topProjects)
            if (vote) {
                setResults(vote)
            }
            if (partnerVotes) {
                setTokenVoterResults(partnerVotes)
            }
            setLoading(false)
        }
    }, [
        event.overallReviewMethod,
        event.slug,
        updateVote,
        updateVotesWithToken,
        idToken,
    ])

    useEffect(() => {
        update()
    }, [update])

    const getScoreText = projectId => {
        const scoreFromUsers = results[projectId]?.length ?? 0
        const scoreFromTokenVoters =
            tokenVoterResults.find(res => res.project === projectId)?.votes ?? 0

        const total = scoreFromUsers + scoreFromTokenVoters
        return (
            <>
                <strong>{total}</strong> <br />
                Participant votes: {scoreFromUsers} <br />
                Token votes: {scoreFromTokenVoters}
            </>
        )
    }
    console.log('resus are', results)
    return (
        <PageWrapper loading={loading}>
            <PageHeader heading="Results" subheading="Finalist vote results" />
            <Grid container spacing={3}>
                {projects.map(project => (
                    <ProjectsGridItem
                        project={project}
                        event={event}
                        score={getScoreText(project._id)}
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
