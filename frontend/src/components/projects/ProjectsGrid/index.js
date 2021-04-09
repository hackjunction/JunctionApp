import React, { useEffect, useState } from 'react'

import { sortBy } from 'lodash-es'
import moment from 'moment-timezone'
import { Grid } from '@material-ui/core'
import { EventHelpers } from '@hackjunction/shared'
import ProjectsGridItem from '../ProjectsGridItem'

import ProjectScoresService from 'services/projectScores'
import project from 'pages/_dashboard/slug/project'

// Helper function to calculate project scores average.
const averageScores = ({ avg, n }, scores) => {
    return {
        avg: (scores.score + n * avg) / (n + 1),
        n: n + 1,
    }
}
/*
if project has been multiple scores calculate the average of the scores, and add it as score.
Note using 'score' key for multiple score average is a quite dirty hack to sort them.
*/
//TODO: Change 'score' - key to average or something
const projectScoresAverage = (inital, project) => {
    if ('scores' in project) {
        const initialVals = { avg: 0, n: 0 }
        const averageProjectScores = project.scores.reduce(
            averageScores,
            initialVals,
        ).avg
        const result = [...inital, { ...project, score: averageProjectScores }]
        console.log('result', result)
        return result
    } else {
        return [...inital, project]
    }
}
//add projects into same list
const addAverageToProjects = projects => {
    const inital = []
    const final = projects.reduce(projectScoresAverage, inital)
    //console.log('all', all)
    return final
}

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
    const isVotingOpen = EventHelpers.isVotingOpen(event, moment)
    const [sorted, setSorted] = useState(projects)
    console.log('event>>', event)
    async function fetchData() {
        const nprojects = await Promise.all(
            projects.map(async project => {
                return ProjectScoresService.getScoreByEventSlugAndProjectIdAndPartnerToken(
                    token,
                    event.slug,
                    project._id,
                )
                    .then(score => {
                        if (!isVotingOpen) {
                            if (score[0]) {
                                return { ...{ scores: [...score] }, ...project }
                            }
                            return Object.assign(
                                { score: 0, message: 'Not rated' },
                                project,
                            )
                        } else {
                            return Object.assign(
                                { score: 0, message: 'Review ongoing' },
                                project,
                            )
                        }
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
        const sorted = addAverageToProjects(nprojects)
        //const result = sortBy(nprojects, p => -p['score'])
        //console.log(sorted)
        setSorted(sortBy(sorted, p => -p['score']))
    }

    useEffect(() => {
        if (showScore) {
            console.log('fetch')
            fetchData()
        } else {
            setSorted(
                sortField ? sortBy(projects, p => p[sortField]) : projects,
            )
        }
    }, [projects])
    //    console.log(sorted)
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
                />
            ))}
        </Grid>
    )
}

export default ProjectsGrid
