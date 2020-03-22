import React from 'react'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import ProjectsTable from 'components/tables/ProjectsTable'

export default () => {
    const projects = useSelector(OrganiserSelectors.projects)
    const event = useSelector(OrganiserSelectors.event)

    return (
        <ProjectsTable
            baseURL={`/projects/${event.slug}/view/`}
            projects={projects}
        />
    )
}
