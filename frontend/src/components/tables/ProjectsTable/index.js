import React, { useMemo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import EditProjectModal from 'components/modals/EditProjectModal'
import _ from 'lodash'
import { CSVLink } from 'react-csv'
import { projectURLgenerator } from 'utils/dataModifiers'

const ProjectsTable = ({ projects }) => {
    const teams = useSelector(OrganiserSelectors.teams)
    const event = useSelector(OrganiserSelectors.event)

    const skipArray = ['_id', '__v', 'id', 'key', 'section']
    function flattenObject(ob) {
        let toReturn = {}
        for (let i in ob) {
            if (!ob.hasOwnProperty(i) || skipArray.some(val => val === i))
                continue

            if (typeof ob[i] === 'object' && ob[i] !== null) {
                let flatObject = flattenObject(ob[i])
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue
                    toReturn[i + '.' + x] = flatObject[x]
                }
            } else {
                toReturn[i] = ob[i]
            }
        }
        return toReturn
    }

    const [selected, setSelected] = useState([])

    const [selectedProject, setSelectedProject] = useState(null)

    // TODO config columsn (table only in physical events)
    const openSingleEdit = useCallback(row => {
        setSelectedProject(row.original)
    }, [])

    const columns = useMemo(() => {
        return [
            {
                Header: '',
                accessor: (row, index) => {
                    return index + 1
                },
                id: 'index',
                ...Sorters.Numeric,
            },
            {
                Header: 'Status',
                accessor: 'status',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Team',
                accessor: 'teamCode',
                ...Sorters.Alphanumeric,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Name',
                accessor: 'name',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Punchline',
                accessor: 'punchline',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Demo',
                accessor: 'demo',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Source',
                accessor: 'source',
                ...Sorters.Alphabetic,
                ...Filters.ContainsSearch,
            },
        ]
    }, [])

    const data = projects
        .map(project => {
            const teamFound = teams.find(team => {
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

    const exportProjects = selectedRows => {
        setSelected(selectedRows)
    }

    return (
        <>
            <EditProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
            <Table
                data={data}
                columns={columns}
                onRowClick={openSingleEdit}
                enableExport={false}
                bulkActions={[
                    {
                        key: 'export-projects',
                        label: (
                            <CSVLink
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                data={selected.map(item => {
                                    const returnObject = {
                                        ...flattenObject(item.original),
                                        projectId: item.original._id,
                                        projectURL: projectURLgenerator(
                                            event.slug,
                                            item.original._id,
                                        ),
                                    }
                                    return returnObject
                                })}
                                filename="export.csv"
                            >
                                Export selected
                            </CSVLink>
                        ),
                        action: exportProjects,
                    },
                ]}
            />
        </>
    )
}

export default ProjectsTable
