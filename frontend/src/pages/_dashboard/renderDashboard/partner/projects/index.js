import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Dialog, Typography } from '@material-ui/core'
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
import { EventHelpers } from '@hackjunction/shared'
import moment from 'moment-timezone'
import { useTranslation } from 'react-i18next'

//TODO simplify this component and the reviewer score process
//TODO make this to work with the project tracks too
export default ({ event }) => {
    const { t } = useTranslation()
    const idToken = useSelector(AuthSelectors.getIdToken)
    const userId = useSelector(AuthSelectors.getUserId)
    const dispatch = useDispatch()
    const { slug } = event
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [selected, setSelected] = useState(null)
    const [projectScore, setProjectScore] = useState({})

    const resetProjectData = () => {
        setSelected(null)
        setProjectScore({})
    }

    if (event?.scoreCriteriaSettings === undefined) {
        return <Empty isEmpty emptyText="Reviewing not yet available" />
    }

    const fetchProjects = async (idToken, slug) => {
        setLoading(true)
        try {
            const dataOt = await ProjectsService.getProjectsByEventAsPartner(
                idToken,
                slug,
            )
            const data = {
                event,
                ...dataOt,
            }
            setData(data)
        } catch (err) {
            dispatch(
                SnackbarActions.error(
                    `${t('Error_loading_projects_')}: ${err.message}`,
                ),
            )
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { projectScoreId, score, scoreCriteria, message } = values
        if (score < 1) {
            return dispatch(
                SnackbarActions.error(`${t('Error_missing_criteria_value_')}`),
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
                    `${
                        selected?.name
                            ? t('Score_saved_for_', {
                                  projectName: _.truncate(selected?.name, {
                                      length: 15,
                                  }),
                              })
                            : t('Score_saved')
                    }`,
                ),
            )
            resetForm()
            resetProjectData()
        } catch (e) {
            dispatch(
                SnackbarActions.error(
                    `${t('Error_score_not_saved_')}. Error: ${
                        e?.response?.data?.message ||
                        e?.response?.data?.error ||
                        e.message
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
            } else if (
                selected &&
                EventHelpers.isReviewingOpen(event, moment)
            ) {
                fetchProjectScore(idToken, slug, selected._id)
            }
        }
    }, [event, idToken, selected])

    const fetchProjectScore = async (idToken, slug, projectId) => {
        ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerAccount(
            idToken,
            slug,
            projectId,
        )
            .then(projectScoreFound => {
                if (projectScoreFound?.scoreCriteriaHasChanged) {
                    dispatch(
                        SnackbarActions.show(
                            `The scoring criteria has been updated, please update your evaluation using the new criteria`,
                        ),
                    )
                }
                setProjectScore(projectScoreFound)
            })
            .catch(e => {
                dispatch(
                    SnackbarActions.error(
                        `Score could not be loaded. Error: ${
                            e?.response?.data?.message ||
                            e?.response?.data?.error ||
                            e?.message
                        }`,
                    ),
                )
            })
    }

    const renderProjects = inputData => {
        return (
            <>
                <div className="tw-flex tw-justify-between tw-items-end">
                    <PageHeader
                        heading={t('Review_projects_')}
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
                    projects={inputData.projects}
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
                    {idToken && EventHelpers.isReviewingOpen(event, moment) ? (
                        <Container>
                            {projectScore?.scoreCriteria && (
                                <EvaluationForm
                                    submit={handleSubmit}
                                    score={projectScore}
                                    scoreCriteria={projectScore?.scoreCriteria}
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
        return <Empty isEmpty emptyText={t('No_projects_available_')} />
    }

    const renderNotification = () => {
        if (EventHelpers.isReviewingOpen(event, moment)) {
            return (
                <div className="tw-w-full tw-justify-start tw-flex tw-pb-8">
                    <div className="tw-border-black tw-border-solid tw-flex tw-flex-col tw-items-start tw-p-4">
                        <Typography variant="h6" gutterBottom>
                            {t('Reviewing_is_open_')}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {t('Reviewing_end_time_', {
                                reviewing_end_time: moment(
                                    event.reviewingEndTime,
                                ).fromNow(),
                            })}
                        </Typography>
                    </div>
                </div>
            )
        }
        if (EventHelpers.isReviewingPast(event, moment)) {
            return (
                <div className="tw-w-full tw-justify-start tw-flex tw-pb-8">
                    <div className="tw-border-black tw-border-solid tw-flex tw-flex-col tw-items-start tw-p-4">
                        <Typography variant="h6" gutterBottom>
                            {t('Reviewing_is_past_', {
                                reviewing_end_time: moment(
                                    event.reviewingEndTime,
                                ).fromNow(),
                            })}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {t('Reviewing_closed_message_partner_review_')}
                        </Typography>
                    </div>
                </div>
            )
        }
        return (
            <div className="tw-w-full tw-justify-start tw-flex tw-pb-8">
                <div className="tw-border-black tw-border-solid tw-flex tw-flex-col tw-items-start tw-p-4 tw-text-left">
                    <Typography variant="h6" gutterBottom>
                        {t('Reviewing_is_upcoming_')}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {t('Reviewing_upcoming_message_partner_review_', {
                            time: moment(event.reviewingStartTime).format(
                                'LLLL',
                            ),
                        })}
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <PageWrapper
            loading={loading || !data}
            error={error}
            render={() => (
                <Container center>
                    {renderNotification()}
                    {data?.event && data?.projects.length > 0
                        ? renderProjects(data)
                        : renderEmpty()}
                </Container>
            )}
        ></PageWrapper>
    )
}
