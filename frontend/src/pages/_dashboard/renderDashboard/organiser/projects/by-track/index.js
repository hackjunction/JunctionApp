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
import { getProjectsForTrack } from 'utils/dataModifiers'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)
    const teams = useSelector(OrganiserSelectors.teams)

    return (
        <Box>
            {event.tracks.map(track => {
                const projectsForTrack = getProjectsForTrack(
                    projects,
                    teams,
                    track.slug,
                )

                return (
                    <Accordion key={track.slug}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={track.name}
                                secondary={`${projectsForTrack.length} projects`}
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
                                <ProjectsTable projects={projectsForTrack} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}
