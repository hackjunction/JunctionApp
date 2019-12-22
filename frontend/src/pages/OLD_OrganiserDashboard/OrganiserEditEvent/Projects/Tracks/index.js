import React from 'react'
import { connect } from 'react-redux'
import {
    Box,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import ProjectsTable from '../ProjectsTable'

const TracksTab = ({ event, projects, projectsLoading }) => {
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
                            <ProjectsTable projects={projects} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
        </Box>
    )
}

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state),
})

export default connect(mapState)(TracksTab)
