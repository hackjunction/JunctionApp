import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Dialog } from '@material-ui/core'
import PageWrapper from 'components/layouts/PageWrapper'
import Container from 'components/generic/Container'
import PageHeader from 'components/generic/PageHeader'
import ProjectsGrid from 'components/projects/ProjectsGrid'

import ProjectsService from 'services/projects'
import _ from 'lodash'

import ProjectDetail from 'components/projects/ProjectDetail'
import * as AuthSelectors from 'redux/auth/selectors'
import ProjectScoresService from 'services/projectScores'
import EvaluationForm from 'pages/_projects/slug/view/projectId/EvaluationForm'
import Empty from 'components/generic/Empty'
import * as SnackbarActions from 'redux/snackbar/actions'

//TODO simplify this component and the reviewer score process
//TODO make this and track one into a component
export default ({ event }) => {
    const scoreCriteriaBase = [
        ...event?.scoreCriteriaSettings?.scoreCriteria.map(criteria => ({
            ...criteria,
        })),
    ]

    const idToken = useSelector(AuthSelectors.getIdToken)
    const userId = useSelector(AuthSelectors.getUserId)
    const dispatch = useDispatch()
    const { slug } = event
    const [data, setData] = useState({})
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [selected, setSelected] = useState(null)
    const [projectScore, setProjectScore] = useState({})

    const resetProjectData = () => {
        if (Array.isArray(scoreCriteriaBase) && scoreCriteriaBase.length > 0) {
            scoreCriteriaBase.forEach(criteria => {
                if (criteria.score) {
                    delete criteria.score
                }
            })
        }
        setSelected(null)
        setProjectScore({})
    }

    if (event?.scoreCriteriaSettings === undefined) {
        return <Empty isEmpty emptyText="Reviewing not yet available" />
    }

    const fetchProjects = useCallback(
        async (idToken, slug) => {
            setLoading(true)
            try {
                const dataOt =
                    await ProjectsService.getProjectsByEventAsPartner(
                        idToken,
                        slug,
                    )
                const data = {
                    event,
                    ...dataOt,
                }
                setData(data)
                setProjects(data?.projects)
            } catch (err) {
                dispatch(
                    SnackbarActions.error(
                        `Error found when loading projects: ${err.message}`,
                    ),
                )
                setError(true)
            } finally {
                setLoading(false)
            }
        },
        [slug, idToken],
    )

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { projectScoreId, score, scoreCriteria, message } = values
        if (score < 1) {
            return dispatch(
                SnackbarActions.error(
                    `You must assign a value for all criteria before submitting.`,
                ),
            )
        }
        const reviewData = {
            userId,
            score,
            scoreCriteria,
            message,
        }
        try {
            if (projectScoreId) {
                await ProjectScoresService.updateScoreByEventSlugAndProjectIdAndPartnerAccount(
                    idToken,
                    slug,
                    projectScoreId,
                    reviewData,
                )
            } else {
                const projectId = selected._id
                await ProjectScoresService.addScoreByEventSlugAndProjectIdAndPartnerAccount(
                    idToken,
                    slug,
                    projectId,
                    reviewData,
                )
            }
            dispatch(
                SnackbarActions.success(
                    `Score saved${
                        selected?.name &&
                        ' for ' + _.truncate(selected?.name, { length: 15 })
                    } `,
                ),
            )
            resetForm()
            resetProjectData()
        } catch (e) {
            dispatch(
                SnackbarActions.error(
                    `Score could not be saved. Error: ${
                        e.response.data.error || e.message
                    }`,
                ),
            )
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        if (idToken && event) {
            if (!selected) {
                fetchProjects(idToken, slug)
            } else if (selected) {
                fetchProjectScore(idToken, slug, selected._id)
            }
        }
    }, [event, idToken, selected])

    const fetchProjectScore = useCallback(
        async (idToken, slug, projectId) => {
            ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerAccount(
                idToken,
                slug,
                projectId,
            )
                .then(score => {
                    if (score[0]) {
                        const reviewerData = _.find(
                            score[0].reviewers,
                            reviewer => reviewer.userId === userId,
                        )
                        if (reviewerData) {
                            setProjectScore({
                                projectScoreId: score[0]._id,
                                score: reviewerData.score,
                                scoreCriteria: reviewerData.scoreCriteria,
                                message: reviewerData.message,
                            })
                        } else {
                            setProjectScore({
                                projectScoreId: score[0]._id,
                                score: 0,
                                scoreCriteria: scoreCriteriaBase,
                                message: '',
                            })
                        }
                    } else {
                        setProjectScore({
                            ...projectScore,
                            scoreCriteria: scoreCriteriaBase,
                        })
                    }
                })
                .catch(e => {
                    dispatch(
                        SnackbarActions.error(
                            `Score could not be loaded. Error: ${
                                e.response.data.error || e.message
                            }`,
                        ),
                    )
                })
        },
        [selected],
    )

    const renderProjects = inputData => {
        return (
            <>
                <div className="tw-flex tw-justify-between tw-items-end">
                    <PageHeader
                        heading="Project review"
                        subheading={`Available for review:`}
                        alignment="left"
                        details={`${inputData?.projects.length} project${
                            inputData?.projects.length > 1 ||
                            inputData?.projects.length < 1
                                ? 's'
                                : ''
                        }`}
                    />
                </div>

                <Box height={20} />
                <ProjectsGrid
                    filterEnabled={true}
                    projects={projects}
                    event={inputData.event}
                    onSelect={setSelected}
                    showScore={true}
                    token={idToken}
                    reviewerGrid={true}
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
                            {scoreCriteriaBase &&
                                scoreCriteriaBase.length > 0 && (
                                    <EvaluationForm
                                        submit={handleSubmit}
                                        score={projectScore}
                                        scoreCriteria={scoreCriteriaBase}
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
                    {data?.event && data?.projects.length > 0
                        ? renderProjects(data)
                        : renderEmpty()}
                </Container>
            )}
        ></PageWrapper>
    )
}
