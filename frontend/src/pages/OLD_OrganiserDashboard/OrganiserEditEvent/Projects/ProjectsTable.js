import React, { useMemo } from 'react'

import { Table, Filters, Sorters } from 'components/generic/_Table'

const ProjectsTable = ({ projects }) => {
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
                Header: 'Location',
                accessor: 'location',
                ...Filters.ContainsSearch,
            },
        ]
    }, [])

    return <Table data={projects} columns={columns} />
}

export default ProjectsTable
