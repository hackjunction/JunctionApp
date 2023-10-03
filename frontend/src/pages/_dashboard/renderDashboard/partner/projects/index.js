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
import Empty from 'components/generic/Empty'
import * as SnackbarActions from 'redux/snackbar/actions'
import ScoreForm from 'pages/_projects/slug/view/projectId/ScoreForm'

const projectScoreBase = {
    project: '',
    event: '',
    status: 'submitted',
    score: 0,
    maxScore: 10,
    message: '',
    scoreCriteria: [],
    reviewers: [],
}

//TODO simplify this component and the reviewer score process
//TODO make this and track one into a component
export default ({ event }) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const userId = useSelector(AuthSelectors.getUserId)
    const allFilterLabel = 'All projects'
    const match = useRouteMatch()
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
    const [projectScore, setProjectScore] = useState(projectScoreBase)

    const resetProjectData = () => {
        setSelected(null)
        setScoreExists(false)
    }

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

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const submissionValues = { ...values }
        console.log('submissionValues before submission', submissionValues)
        submissionValues.project = selected._id
        submissionValues.event = event._id
        let reviewerData
        // const reviewerData = {
        //     userId: userId,
        //     score: submissionValues.score,
        //     // scoreCriteria: submissionValues.scoreCriteria,
        //     // message: submissionValues.message,
        // }
        console.log('submissionValues before', submissionValues)
        if (userId) {
            reviewerData = _.find(
                submissionValues.reviewers,
                reviewer => reviewer.userId === userId,
            )
            if (reviewerData) {
                console.log('User already in reviewers list')
                reviewerData = _.find(
                    submissionValues.reviewers,
                    reviewer => reviewer.userId === userId,
                )
                reviewerData.score = submissionValues.score
                reviewerData.scoreCriteria = submissionValues.scoreCriteria
                reviewerData.message = submissionValues.message
            } else {
                console.log('User is not in the list')
                reviewerData = {
                    userId: userId,
                    score: submissionValues.score,
                    scoreCriteria: submissionValues.scoreCriteria,
                    message: submissionValues.message,
                }
                submissionValues.reviewers.push(reviewerData)
            }
            delete submissionValues.score
            delete submissionValues.scoreCriteria
            delete submissionValues.message
        }
        console.log('submissionValues after push or edit', submissionValues)
        console.log('values', values)
        console.log('submissionValues', submissionValues)
        try {
            if (scoreExists) {
                await ProjectScoresService.updateScoreByEventSlugAndProjectIdAndPartnerAccount(
                    idToken,
                    event.slug,
                    submissionValues,
                )
            } else {
                await ProjectScoresService.addScoreByEventSlugAndProjectIdAndPartnerAccount(
                    idToken,
                    event.slug,
                    submissionValues,
                )
            }
            setProjectScore(values)
            dispatch(SnackbarActions.success(`Score saved.`))
            resetForm()
        } catch (e) {
            dispatch(
                SnackbarActions.error(
                    `Score could not be saved. Error: ${e.message}`,
                ),
            )
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    if (!data) {
        return null
    }

    useEffect(() => {
        if (idToken && selected && event) {
            ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerAccount(
                idToken,
                event.slug,
                selected._id,
            ).then(score => {
                console.log('Score', score)
                if (score[0]) {
                    const reviewerData = _.find(
                        score[0].reviewers,
                        reviewer => reviewer.userId === userId,
                    )
                    if (reviewerData) {
                        setProjectScore({
                            ...score[0],
                            score: reviewerData.score,
                            scoreCriteria: reviewerData.scoreCriteria,
                            message: reviewerData.message,
                        })
                    } else {
                        setProjectScore({
                            ...score[0],
                            score: 0,
                            scoreCriteria: scoreCriteriaBase,
                            message: '',
                        })
                    }
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

    const renderProjects = inputData => {
        return (
            <>
                <div className="tw-flex tw-justify-between tw-items-end">
                    <PageHeader
                        heading={inputData?.challenge.name}
                        subheading={`By ${inputData?.challenge.partner}`}
                        alignment="left"
                        details={`${inputData?.projects.length} project${
                            inputData?.projects.length > 1 ||
                            inputData?.projects.length < 1
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
                    event={inputData.event}
                    onSelect={setSelected}
                    showScore={true}
                    token={idToken}
                />

                <Box height={200} />
                <Dialog
                    transitionDuration={0}
                    fullScreen
                    open={Boolean(selected)}
                    onClose={resetProjectData}
                >
                    <ProjectDetail
                        project={selected}
                        event={event}
                        onBack={resetProjectData}
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
                                    submit={handleSubmit}
                                    score={projectScore}
                                    scoreCriteria={scoreCriteriaBase}
                                />
                            ) : (
                                // <span>Not to do</span>
                                <ScoreForm
                                    event={event}
                                    project={selected}
                                    submit={handleSubmit}
                                    score={projectScore}
                                />
                            )}
                            <Box height={200} />
                        </Container>
                    ) : null}
                </Dialog>
            </>
        )
    }

    const renderEmpty = () => {
        return <Empty isEmpty emptyText="No projects available" />
    }

    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <Container center>
                    {data?.challenge && data?.event && data?.projects.length > 0
                        ? renderProjects(data)
                        : renderEmpty()}
                </Container>
            )}
        ></PageWrapper>
    )
}
