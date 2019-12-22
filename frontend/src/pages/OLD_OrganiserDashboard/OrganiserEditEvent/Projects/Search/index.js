import React from 'react'
import { connect } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import ProjectsTable from '../ProjectsTable'

const SearchTab = ({ event, projects, projectsLoading }) => {
    return <ProjectsTable projects={projects} />
}

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state),
})

export default connect(mapState)(SearchTab)
