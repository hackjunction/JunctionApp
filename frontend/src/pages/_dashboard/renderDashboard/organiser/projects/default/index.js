import React from 'react'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'reducers/organiser/selectors'
import ProjectsTable from 'components/tables/ProjectsTable'

export default () => {
    const projects = useSelector(OrganiserSelectors.projects)

    return <ProjectsTable projects={projects} />
}
