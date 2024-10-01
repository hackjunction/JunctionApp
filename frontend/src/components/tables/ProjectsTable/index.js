import React, { useMemo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import EditProjectModal from 'components/modals/EditProjectModal'
import _ from 'lodash'
import { CSVLink } from 'react-csv'
import { flattenObject, projectURLgenerator } from 'utils/dataModifiers'

const skipArray = ['_id', '__v', 'id', 'key', 'section']
const stringEscapeArray = ['description', 'name', 'punchline']

const ProjectsTable = ({ projects }) => {
    const event = useSelector(OrganiserSelectors.event)

    const [selected, setSelected] = useState([])

    const [selectedProject, setSelectedProject] = useState(null)

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
                sortType: Sorters.Numeric,
            },
            {
                Header: 'Team code',
                accessor: 'teamCode',
                ...Filters.ContainsSearch,
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Team name',
                accessor: 'teamName',
                ...Filters.ContainsSearch,
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Name',
                accessor: 'name',
                ...Filters.ContainsSearch,
                ...Sorters.Alphabetic,
            },
            {
                Header: 'Status',
                accessor: 'status',
                ...Filters.ContainsSearch,
                ...Sorters.Alphabetic,
            },
        ]
    }, [])

    //TODO add a cron function or organizer action to delete projects without a valid team

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
                data={projects}
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
                                        projectId: item.original._id,
                                        projectURL: projectURLgenerator(
                                            event.slug,
                                            item.original._id,
                                        ),
                                        ...flattenObject(
                                            item.original,
                                            skipArray,
                                            stringEscapeArray,
                                        ),
                                    }
                                    return returnObject
                                })}
                                filename="project-exports.csv"
                            >
                                Export selected
                            </CSVLink>
                        ),
                        action: exportProjects,
                    },
                    {
                        key: 'export-gavel',
                        label: (
                            <CSVLink
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                                data={_.compact(
                                    selected.map(item => {
                                        if (item.original.status === 'final') {
                                            const projectName = item.original
                                                .name
                                                ? item.original.name.replace(
                                                      /"/g,
                                                      '""',
                                                  )
                                                : ''
                                            const projectPunchline = item
                                                .original.punchline
                                                ? item.original.punchline.replace(
                                                      /"/g,
                                                      '""',
                                                  )
                                                : ''
                                            const returnObject = {
                                                projectName,
                                                projectURL: projectURLgenerator(
                                                    event.slug,
                                                    item.original._id,
                                                ),
                                                projectPunchline,
                                            }
                                            return returnObject
                                        }
                                    }),
                                )}
                                filename="project-exports-gavel.csv"
                            >
                                Export for gavel
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
