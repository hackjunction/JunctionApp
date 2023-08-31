import React, { useCallback, useEffect, useState } from 'react'

import { sortBy } from 'lodash-es'
import moment from 'moment-timezone'
import { Grid } from '@material-ui/core'
import { EventHelpers } from '@hackjunction/shared'
import ProjectsGridItem from '../ProjectsGridItem'

import ProjectScoresService from 'services/projectScores'

const ProjectsGrid = ({
    projects,
    event,
    onSelect,
    sortField = 'location',
    showFullTeam = false,
    showScore = false,
    token = '',
}) => {
    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment)
    const [sorted, setSorted] = useState(projects)
    const fetchData = useCallback(async () => {
        const nprojects = await Promise.all(
            projects.map(async project => {
                return ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken(
                    token,
                    event.slug,
                    project._id,
                )
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
        setSorted((sortBy(nprojects, p => -p['score']): nprojects))
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
            {sorted.map(project => (
                <ProjectsGridItem
                    project={project}
                    event={event}
                    showTableLocation={isOngoingEvent}
                    showFullTeam={showFullTeam}
                    onClickMore={() => onSelect(project)}
                    score={project?.score}
                    message={project?.message}
                    showTags={true}
                />
            ))}
        </Grid>
    )
}

export default ProjectsGrid
