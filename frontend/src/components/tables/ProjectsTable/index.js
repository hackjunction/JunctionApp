import React, { useMemo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import * as OrganiserSelectors from 'redux/organiser/selectors'

import { Table, Filters, Sorters } from 'components/generic/_Table'
import EditProjectModal from 'components/modals/EditProjectModal'
import ProjectsService from 'services/projects'
import * as AuthSelectors from 'redux/auth/selectors'
import CsvExporterService from 'services/csvExporter'
import { debugGroup } from 'utils/debuggingTools'
import _ from 'lodash'
// import team from 'pages/_sandbox/team'

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
            {
                Header: 'Demo',
                accessor: 'demo',
                ...Filters.ContainsSearch,
            },
            {
                Header: 'Source',
                accessor: 'source',
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

    const data = projects
        .map(project => {
            const teamFound = teams.find(team => {
                console.log(team._id, project.team)
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

    // const data = projects.map(project => {
    //     for (const i in teams) {
    //         const team = teams[i]
    //         if (project.team === team._id) {
    //             project.teamCode = team.code
    //             break
    //         }
    //     }
    //     return project
    // })

    debugGroup('Project data', data)
    debugGroup('Teams data', teams)

    const fetchExportProjectData = exportSelectedProjects => {
        const exportData = _.filter(projects, project =>
            exportSelectedProjects.includes(project._id),
        ).map(project => {
            if (project.submissionFormAnswers) {
                let submissionFormAnswersFormatted = ''
                Object.keys(project.submissionFormAnswers).map(key => {
                    Object.keys(project.submissionFormAnswers[key]).map(
                        answerKey => {
                            if (answerKey === 'key') {
                                submissionFormAnswersFormatted = `${project.submissionFormAnswers[key][answerKey]}: ${submissionFormAnswersFormatted}`
                            } else if (answerKey === 'value') {
                                submissionFormAnswersFormatted += `${project.submissionFormAnswers[key][answerKey]}`
                            }
                        },
                    )
                })
                console.log(submissionFormAnswersFormatted)
                project.submissionFormAnswers = submissionFormAnswersFormatted
            }

            // project.submissionFormAnswers &&
            //     (project.submissionFormAnswers = Object.keys(project.submissionFormAnswers)
            return project
        })
        //TODO stringify the submissions questions
        console.log('exportData :>> ', exportData)
        CsvExporterService.exportToCsv(exportData, 'project-export')

        // ProjectsService.exportProjects(
        //     idToken,
        //     event.slug,
        //     exportSelectedProjects,
        // ).then(response => {
        //     console.log('response :>> ', response)
        //     CsvExporterService.exportToCsv(response, 'project-export')
        // })
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
