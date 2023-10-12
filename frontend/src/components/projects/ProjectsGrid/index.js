import React, { useCallback, useEffect, useState } from 'react'

import { sortBy } from 'lodash-es'
import moment from 'moment-timezone'
import { Grid } from '@material-ui/core'
import { EventHelpers } from '@hackjunction/shared'
import ProjectsGridItem from '../ProjectsGridItem'

import ProjectScoresService from 'services/projectScores'
import { useSelector } from 'react-redux'

import * as AuthSelectors from 'redux/auth/selectors'
import * as UserSelectors from 'redux/user/selectors'
import _ from 'lodash'

const ProjectsGrid = ({
    projects,
    event,
    onSelect,
    sortField = 'location',
    showFullTeam = false,
    showScore = false,
    showTags = true,
    token = '',
    showReviewers = false,
}) => {
    const idToken = useSelector(AuthSelectors.getIdToken)

    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment)
    const [sorted, setSorted] = useState(projects)
    const fetchData = useCallback(async () => {
        const nprojects = await Promise.all(
            projects.map(async project => {
                const projectScoreLogic = async () => {
                    if (!token) {
                        return ProjectScoresService.getScoreByEventSlugAndProjectId(
                            idToken,
                            event.slug,
                            project._id,
                        )
                    } else {
                        return ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken(
                            token,
                            event.slug,
                            project._id,
                        )
                    }
                }
                return projectScoreLogic()
                    .then(score => {
                        if (score[0]) {
                            return Object.assign(score[0], project)
                        }
                        return Object.assign(
                            { score: 0, message: 'Not rated' },
                            project,
                        )
                    })
                    .catch(e => {
                        console.log(e)
                        return Object.assign(
                            { score: 0, message: 'Not rated' },
                            project,
                        )
                    })
            }),
        )
        setSorted(sortBy(nprojects, p => -p['score']))
    }, [event.slug, projects, token])

    useEffect(() => {
        if (showScore) {
            fetchData()
        } else {
            setSorted(
                sortField ? sortBy(projects, p => p[sortField]) : projects,
            )
        }
    }, [fetchData, projects, showScore, sortField])

    return (
        <Grid
            container
            spacing={3}
            direction="row"
            alignItems="stretch"
            justify="center"
        >
            {sorted.map((project, index) => {
                const projectScore = project?.averageScore
                    ? project.averageScore
                    : project?.score
                let projectMessage
                if (project?.message) {
                    projectMessage = project.message
                } else if (project?.reviewers?.length > 0) {
                    projectMessage = project.reviewers[0].message
                }
                return (
                    <ProjectsGridItem
                        key={index}
                        project={project}
                        event={event}
                        showTableLocation={isOngoingEvent}
                        // showFullTeam={showFullTeam}
                        onClickMore={() => onSelect(project)}
                        score={projectScore}
                        message={projectMessage}
                        showTags={showTags}
                        showReviewers={showReviewers}
                    />
                )
            })}
        </Grid>
    )
}

export default ProjectsGrid
