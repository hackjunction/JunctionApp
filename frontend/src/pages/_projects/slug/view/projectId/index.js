import React, { useState, useEffect, useCallback } from 'react'
import { goBack } from 'connected-react-router'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import PageWrapper from 'components/layouts/PageWrapper'
import ProjectDetail from 'components/projects/ProjectDetail'
import ShareProject from 'components/projects/ProjectDetail/ShareProject'
import ScoreForm from './ScoreForm'
import Container from 'components/generic/Container'

import moment from 'moment-timezone'
import { EventHelpers } from '@hackjunction/shared'

import * as SnackbarActions from 'redux/snackbar/actions'

import ProjectsService from 'services/projects'
import ProjectScoresService from 'services/projectScores'
import { set } from 'object-path'
import EvaluationForm from './EvaluationForm'

const scoreCriteriaBase = [
    {
        criteria: 'creativity',
        label: 'Creativity',
    },
    {
        criteria: 'innovation',
        label: 'Innovation',
    },
    {
        criteria: 'problemSolving',
        label: 'Problem Solving',
    },
    {
        criteria: 'companyFit',
        label: 'Company Fit',
    },
    {
        criteria: 'teamwork',
        label: 'Teamwork',
    },
]

export default ({ event, showFullTeam }) => {
    const dispatch = useDispatch()

    const match = useRouteMatch()
    const { projectId, token } = match.params
    const { slug } = event
    const [scoreExists, setScoreExists] = useState(false)
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [validToken, setValidToken] = useState(false)

    useEffect(() => {
        if (token && project && event) {
            ProjectsService.validateToken(slug, token).then(v => {
                if (v) setValidToken(v)
            })
        }
    }, [event, project, slug, token])

    const [projectScore, setProjectScore] = useState({
        project: '',
        event: '',
        status: 'submitted',
        score: 0,
        maxScore: 10,
        message: '',
        scoreCriteria: scoreCriteriaBase,
    })
    useEffect(() => {
        if (token && project && event) {
            ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken(
                token,
                event.slug,
                project._id,
            ).then(score => {
                console.log('Score', score)
                if (score[0]) {
                    setProjectScore(score[0])
                    setScoreExists(true)
                }
            })
        }
    }, [event, token, project])

    const fetchProject = useCallback(async () => {
        setLoading(true)
        try {
            const project = await ProjectsService.getPublicProjectById(
                projectId,
            )
            console.log('Project details', project)
            setProject(project)
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [projectId])

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        values.project = project._id
        values.event = event._id
        try {
            if (scoreExists) {
                await ProjectScoresService.updateScoreByEventSlugAndPartnerToken(
                    token,
                    event.slug,
                    values,
                )
                setProjectScore(values)
            } else {
                await ProjectScoresService.addScoreByEventSlugAndPartnerToken(
                    token,
                    event.slug,
                    values,
                )
                setProjectScore(values)
            }

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

    const onBack = useCallback(() => {
        dispatch(goBack())
    }, [dispatch])

    useEffect(() => {
        fetchProject()
    }, [fetchProject])
    return (
        <PageWrapper loading={loading} error={error}>
            <ProjectDetail
                project={project}
                event={event}
                onBack={onBack}
                showFullTeam={showFullTeam}
                showTableLocation={!EventHelpers.isEventOver(event, moment)}
            />
            {validToken ? (
                <Container>
                    {projectScore?.scoreCriteria &&
                    projectScore?.scoreCriteria.length > 0 ? (
                        <EvaluationForm
                            event={event}
                            project={project}
                            submit={handleSubmit}
                            score={projectScore}
                            scoreCriteria={scoreCriteriaBase}
                        />
                    ) : (
                        <ScoreForm
                            event={event}
                            project={project}
                            submit={handleSubmit}
                            score={projectScore}
                        />
                    )}
                </Container>
            ) : null}
            <ShareProject project={project} event={event} />
        </PageWrapper>
    )
}
