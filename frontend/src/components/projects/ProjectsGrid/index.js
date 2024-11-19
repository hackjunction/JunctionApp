import React, { useCallback, useEffect, useState } from 'react'

import moment from 'moment-timezone'
import { Grid } from '@material-ui/core'
import { EventHelpers } from '@hackjunction/shared'
import ProjectsGridItem from '../ProjectsGridItem'

import ProjectScoresService from 'services/projectScores'
import { useSelector } from 'react-redux'

import * as AuthSelectors from 'redux/auth/selectors'
import _ from 'lodash'
import Filter from 'components/Team/Filter'

const ProjectsGrid = ({
    projects,
    event,
    onSelect,
    showScore = false,
    showTags = true,
    token = '',
    showReviewers = false,
    reviewerGrid = false,
    filterEnabled = false,
}) => {
    const idToken = useSelector(AuthSelectors.getIdToken)
    const userId = useSelector(AuthSelectors.getUserId)
    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment)
    const [sorted, setSorted] = useState(projects)
    const projectScoreLogic = async project => {
        if (!token) {
            const scoresNotToken =
                await ProjectScoresService.getScoreByEventSlugAndProjectId(
                    idToken,
                    event.slug,
                    project._id,
                )
            return scoresNotToken
        } else {
            const scoresWithToken =
                await ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken(
                    token,
                    event.slug,
                    project._id,
                )
            return scoresWithToken
        }
    }
    const fetchData = useCallback(async () => {
        // TODO add loading indicator
        //TODO find a way to get if a project has been reviewed by partner in a more efficient manner so it doesnt run for all project fetched
        const projectScoreData = await Promise.allSettled(
            projects.map(async project => {
                return projectScoreLogic(project)
                    .then(score => {
                        return score[0]
                    })
                    .catch(e => {
                        console.log('got error', e)
                    })
            }),
        )
        const returnProjects = projects.map(project => {
            const scoreData = projectScoreData.find(
                score => score?.value?.project === project._id,
            )
            if (scoreData) {
                if (reviewerGrid) {
                    const userScore = scoreData?.value?.reviewers?.find(
                        reviewer => {
                            return reviewer?.userId === userId
                        },
                    )
                    if (userScore) {
                        project.scoreData = userScore
                    }
                } else {
                    project.scoreData = scoreData?.value
                }
            }
            return project
        })
        let sortedProjects
        if (reviewerGrid) {
            sortedProjects = _.sortBy(
                returnProjects,
                p => -(p.scoreData?.score || 0),
            )
        } else if (showScore) {
            sortedProjects = _.sortBy(
                returnProjects,
                p => -(p.scoreData?.averageScore || 0),
            )
        }
        if (sortedProjects) {
            setSorted(sortedProjects)
        } else {
            setSorted(returnProjects)
        }
    }, [event.slug, projects, token])

    useEffect(() => {
        if (showScore || showReviewers) {
            fetchData()
        } else {
            setSorted(projects)
        }
    }, [fetchData, projects, showScore])

    const allFilterLabel = 'All projects'
    const [filter, setFilter] = useState(allFilterLabel)
    const onFilterChange = filter => {
        setFilter(filter)
    }

    const filterArray = [
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Pending review', value: 'pending' },
    ]

    const projectsToRender = useCallback(
        (projects, filterSelected) => {
            switch (filterSelected) {
                case 'reviewed':
                    return projects.filter(
                        project => project.scoreData?.userId === userId,
                    )
                case 'pending':
                    return projects.filter(
                        project => project.scoreData?.userId !== userId,
                    )
                default:
                    return projects
            }
        },
        [sorted],
    )

    return (
        <>
            {filterEnabled && (
                <Filter
                    noFilterOption={allFilterLabel}
                    onChange={onFilterChange}
                    filterArray={filterArray}
                />
            )}
            <Grid
                container
                spacing={1}
                direction="row"
                alignItems="stretch"
                justifyContent="center"
            >
                {projectsToRender(sorted, filter).map((project, index) => {
                    return (
                        <ProjectsGridItem
                            key={index}
                            project={project}
                            event={event}
                            showTableLocation={isOngoingEvent}
                            onClickMore={() => onSelect(project)}
                            showTags={showTags}
                            showReviewers={showReviewers}
                            showScore={showScore}
                        />
                    )
                })}
            </Grid>
        </>
    )
}

export default ProjectsGrid
