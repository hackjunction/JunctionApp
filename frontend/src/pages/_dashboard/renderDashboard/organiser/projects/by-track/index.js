import React from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemText,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import * as OrganiserSelectors from 'reducers/organiser/selectors'

import ProjectsTable from 'components/tables/ProjectsTable'
import TrackLink from './TrackLink'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const teams = useSelector(OrganiserSelectors.teams)

    const getProjectsForTrack = slug => {
        const projectsWithTeam = projects
            .map(project => {
                const teamFound = teams.find(team => {
                    console.log(team._id, project.team)
                    return team._id === project.team
                })
                if (teamFound) {
                    project.teamCode = teamFound.code
                } else {
                    project.teamCode = 'No team'
                }
                return project
            })
            .filter(project => project.teamCode !== 'No team')
        return projectsWithTeam.filter(project => project.track === slug)
    }

    return (
        <Box>
            {event.tracks.map(track => {
                const projects = getProjectsForTrack(track.slug)

                return (
                    <Accordion key={track.slug}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={track.name}
                                secondary={`${projects.length} projects`}
                            ></ListItemText>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                display="flex"
                                flexDirection="column"
                                style={{ width: '100%' }}
                            >
                                <Box p={1}>
                                    <TrackLink track={track.slug} />
                                </Box>
                                <ProjectsTable projects={projects} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}
