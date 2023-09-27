import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { push } from 'connected-react-router'
import { Box, Dialog } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'
import { makeStyles } from '@material-ui/core/styles'

import ProjectsService from 'services/projects'
import Filter from 'components/Team/Filter'
import _ from 'lodash'
import scoreCriteriaBase from 'components/projects/ScoreCriteria'

import ProjectView from 'pages/_projects/slug/view/projectId'
import ProjectDetail from 'components/projects/ProjectDetail'
import * as AuthSelectors from 'redux/auth/selectors'
import ProjectScoresService from 'services/projectScores'
import EvaluationForm from 'pages/_projects/slug/view/projectId/EvaluationForm'

//TODO make this and track one into a component
export default ({ event }) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const userId = useSelector(AuthSelectors.getUserId)
    const allFilterLabel = 'All projects'
    const match = useRouteMatch()
    console.log('match', match)
    console.log('match URL', match.url)
    const dispatch = useDispatch()
    const { slug } = event
    const [data, setData] = useState({})
    const [projects, setProjects] = useState([])
    const [draftsProjects, setDraftsProjects] = useState([])
    const [finalProjects, setFinalProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [filter, setFilter] = useState(allFilterLabel)

    const [selected, setSelected] = useState(null)
    const [scoreExists, setScoreExists] = useState(false)

    const onFilterChange = filter => {
        setFilter(filter)
    }

    const fetchProjects = useCallback(async () => {
        setLoading(true)
        try {
            const dataOt = await ProjectsService.getProjectsByEvent(slug)
            const partnerData = _.find(
                event.recruiters,
                recruiter => recruiter.recruiterId === userId,
            )
            console.log('partnerData', partnerData)
            console.log('Event challenges', event.challenges)
            let challengeOrg
            let filteredProjects = []
            if (partnerData) {
                challengeOrg = _.find(
                    event.challenges,
                    challenge => challenge.partner === partnerData.organization,
                )
                if (challengeOrg) {
                    filteredProjects = _.filter(dataOt, project =>
                        _.includes(project.challenges, challengeOrg.slug),
                    )
                }
            }

            console.log('challengeOrg', challengeOrg)
            console.log('filteredProjects', filteredProjects)
            // _.filter(event.challenges, challenge => challenge.partner === )
            // _.filter(dataOt, project => project.challenge)
            const data = {
                projects: filteredProjects,
                event,
                challenge: challengeOrg,
            }
            setData(data)
            setDraftsProjects(
                data.projects.filter(project => project.status === 'draft'),
            )
            setFinalProjects(
                data.projects.filter(project => project.status === 'final'),
            )
            setProjects(data.projects)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }, [slug, idToken])

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    if (!data) {
        return null
    }

    const [projectScore, setProjectScore] = useState({
        project: '',
        event: '',
        status: 'submitted',
        score: 0,
        maxScore: 10,
        message: '',
        scoreCriteria: [],
        reviewers: [],
    })

    useEffect(() => {
        if (idToken && selected && event) {
            ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerAccount(
                idToken,
                event.slug,
                selected._id,
            ).then(score => {
                console.log('Score', score)
                if (score[0]) {
                    setProjectScore(score[0])
                    setScoreExists(true)
                } else {
                    setProjectScore({
                        ...projectScore,
                        scoreCriteria: scoreCriteriaBase,
                    })
                }
            })
        }
    }, [event, idToken, selected])

    const projectsToRender = filter => {
        switch (filter) {
            case 'draft':
                return draftsProjects
            case 'final':
                return finalProjects
            default:
                return projects
        }
    }

    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <Container center>
                    <div className="tw-flex tw-justify-between tw-items-end">
                        <PageHeader
                            heading={data?.challenge.name}
                            subheading={`By ${data?.challenge.partner}`}
                            alignment="left"
                            details={`${data?.projects.length} project${
                                data?.projects.length > 1 ||
                                data?.projects.length < 1
                                    ? 's'
                                    : ''
                            }`}
                        />
                        <Filter
                            noFilterOption={allFilterLabel}
                            onChange={onFilterChange}
                            filterArray={[
                                { label: 'Final projects', value: 'final' },
                                { label: 'Draft projects', value: 'draft' },
                            ]}
                        />
                    </div>

                    <Box height={20} />
                    <ProjectsGrid
                        projects={projectsToRender(filter)}
                        event={data.event}
                        onSelect={setSelected}
                        showScore={true}
                        token={idToken}
                    />

                    <Box height={200} />
                    <Dialog
                        transitionDuration={0}
                        fullScreen
                        open={Boolean(selected)}
                        onClose={() => {
                            setSelected(null)
                            setScoreExists(false)
                        }}
                    >
                        <ProjectDetail
                            project={selected}
                            event={event}
                            onBack={() => setSelected(null)}
                            showTableLocation={false}
                        />
                        {idToken ? (
                            <Container center>
                                {projectScore?.scoreCriteria &&
                                projectScore?.scoreCriteria.length > 0 ? (
                                    // <span>TODO</span>
                                    <EvaluationForm
                                        event={event}
                                        project={selected}
                                        submit={() => console.log('It works')}
                                        score={projectScore}
                                        scoreCriteria={scoreCriteriaBase}
                                    />
                                ) : (
                                    <span>Not to do</span>
                                    // <ScoreForm
                                    //     event={event}
                                    //     project={project}
                                    //     submit={handleSubmit}
                                    //     score={projectScore}
                                    // />
                                )}
                                <Box height={200} />
                            </Container>
                        ) : null}
                    </Dialog>
                </Container>
            )}
        ></PageWrapper>
    )
}
