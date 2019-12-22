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
import * as OrganiserActions from 'redux/organiser/actions'

import GavelTable from './GavelTable'

const GavelAdmin = ({ event, gavelProjects, editGavelProject }) => {
    const renderTable = (title, projects) => {
        return (
            <ExpansionPanel key={title}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <ListItemText
                        primary={title}
                        secondary={`${projects.length} projects`}
                    />
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems="stretch"
                    >
                        <GavelTable gavelProjects={projects} />
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    if (!event) return null

    if (!event.tracks || !event.tracksEnabled) {
        return renderTable('All projects', gavelProjects)
    } else {
        return event.tracks.map(track => {
            const trackProjects = gavelProjects.filter(project => {
                return project.project && project.project.track === track.slug
            })
            return renderTable(track.name, trackProjects)
        })
    }
}

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    gavelProjects: OrganiserSelectors.gavelProjectsPopulated(state),
})

const mapDispatch = dispatch => ({
    editGavelProject: (slug, projectId, edits) =>
        dispatch(OrganiserActions.editGavelProject(slug, projectId, edits)),
})

export default connect(mapState, mapDispatch)(GavelAdmin)
