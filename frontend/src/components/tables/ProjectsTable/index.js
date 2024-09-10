import React, { useMemo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import EditProjectModal from 'components/modals/EditProjectModal'
import _ from 'lodash'
import { CSVLink } from 'react-csv'
import { projectURLgenerator } from 'utils/dataModifiers'

const ProjectsTable = ({ projects }) => {
    const event = useSelector(OrganiserSelectors.event)

    const skipArray = ['_id', '__v', 'id', 'key', 'section']
    const stringEscapeArray = ['description', 'name', 'punchline']
    const flattenObject = ob => {
        let toReturn = {}
        for (let i in ob) {
            if (!ob.hasOwnProperty(i) || skipArray.some(val => val === i))
                continue

            if (stringEscapeArray.some(val => val === i)) {
                toReturn[i] = ob[i].replace(/"/g, '""')
                continue
            } else if (typeof ob[i] === 'object' && ob[i] !== null) {
                let flatObject = flattenObject(ob[i])
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue
                    toReturn[i + '.' + x] = flatObject[x].replace(/"/g, '""')
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
                                        ...flattenObject(item.original),
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
                                filename="export.csv"
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
