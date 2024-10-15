import React from 'react'
import { useSelector } from 'react-redux'
import * as OrganiserSelectors from 'redux/organiser/selectors'
import ProjectsTable from 'components/tables/ProjectsTable'
import { filterProjectsWithTeam } from 'utils/dataModifiers'

export default () => {
    const projects = useSelector(OrganiserSelectors.projects)
    const teams = useSelector(OrganiserSelectors.teams)

    const allProjectsWithTeam = filterProjectsWithTeam(projects, teams)
    return <ProjectsTable projects={allProjectsWithTeam} />
}
