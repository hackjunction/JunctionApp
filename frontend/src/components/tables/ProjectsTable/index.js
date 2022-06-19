import React, { useMemo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import EditProjectModal from 'components/modals/EditProjectModal'
import ProjectsService from 'services/projects'
import * as AuthSelectors from 'redux/auth/selectors'
import CsvExporterService from 'services/csvExporter'

const ProjectsTable = ({ projects, baseURL }) => {
    const teams = useSelector(OrganiserSelectors.teams)
    const event = useSelector(OrganiserSelectors.event)

    //const dispatch = useDispatch()
    //const location = useLocation()

    const [selectedProject, setSelectedProject] = useState(null)
    const idToken = useSelector(AuthSelectors.getIdToken)

    // TODO config columsn (table only in physical events)
    const openSingleEdit = useCallback(row => {
        setSelectedProject(row.original)
        /* const search = `?${new URLSearchParams({
                modal: 'edit',
                id: row.original.user,
            }).toString()}`
            dispatch(push({ search })) */
    }, [])

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

    // const onProjectSelected = useCallback(
    //     project => {
    //         dispatch(push(`${baseURL}${project.original._id}`))
    //     },
    //     [baseURL, dispatch],
    // )

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

    const fetchExportProjectData = exportSelectedProjects => {
        ProjectsService.exportProjects(
            idToken,
            event.slug,
            exportSelectedProjects,
        ).then(response => {
            CsvExporterService.exportToCsv(response, 'project-export')
        })
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
                        label: 'Export selected',
                        action: rows => {
                            const projectIds = rows.map(row => row.original._id)
                            fetchExportProjectData(projectIds)
                        },
                    },
                ]}
            />
        </>
    )
}

export default ProjectsTable
