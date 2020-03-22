import React, { useMemo, useCallback } from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import JobRoleInput from 'components/inputs/JobRoleInput'

const ProjectsTable = ({ projects, baseURL }) => {
    const teams = useSelector(OrganiserSelectors.teams)
    const dispatch = useDispatch()

    // TODO config columsn (table only in physical events)
    const columns = useMemo(() => {
        return [
            {
                Header: '#',
                accessor: (row, index) => {
                    return index + 1
                },
                id: 'index',
                sortType: Sorters.Numeric,
            },
            {
                Header: 'Team',
                accessor: 'teamCode',
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Name',
                accessor: 'name',
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Punchline',
                accessor: 'punchline',
                ...Filters.ContainsSearch,
            },
            /*
            {
                Header: 'Location',
                accessor: 'location',
                ...Filters.ContainsSearch,
            },
            */
        ]
    }, [])

    const onProjectSelected = useCallback(
        project => {
            dispatch(push(`${baseURL}${project.original._id}`))
        },
        [baseURL, dispatch]
    )

    // TODO refactor forloops
    const data = projects.map(project => {
        for (const i in teams) {
            const team = teams[i]
            if (project.team === team._id) {
                project.teamCode = team.code
                break
            }
        }
        return project
    })
    return (
        <Table data={data} columns={columns} onRowClick={onProjectSelected} />
    )
}

export default ProjectsTable
