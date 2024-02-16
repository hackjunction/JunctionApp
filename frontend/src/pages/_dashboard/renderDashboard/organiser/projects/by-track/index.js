import React from 'react'
import { useSelector } from 'react-redux'
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import ProjectsTable from 'components/tables/ProjectsTable'
import TrackLink from './TrackLink'

export default () => {
    const event = useSelector(OrganiserSelectors.event)
    const projects = useSelector(OrganiserSelectors.projects)

    const getProjectsForTrack = slug => {
        return projects.filter(project => project.track === slug)
    }

    return (
        <Box>
            {event.tracks.map(track => {
                const projects = getProjectsForTrack(track.slug)

                return (
                    <ExpansionPanel key={track.slug}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ListItemText
                                primary={track.name}
                                secondary={`${projects.length} projects`}
                            ></ListItemText>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
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
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </Box>
    )
}
