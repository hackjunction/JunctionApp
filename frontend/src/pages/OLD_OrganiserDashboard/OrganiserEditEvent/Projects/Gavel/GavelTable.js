import React, { useMemo } from 'react';

import { Table, Filters, Sorters } from 'components/generic/_Table';

const GavelTable = ({ gavelProjects }) => {
    const columns = useMemo(() => {
        return [
            {
                Header: 'Name',
                accessor: row => row.project?.name,
                id: 'name',
                ...Filters.ContainsSearch
            },
            {
                Header: 'Location',
                accessor: row => row.project?.location,
                id: 'location',
                ...Filters.ContainsSearch
            },
            {
                Header: 'Rating (mu)',
                accessor: row => row.mu.toPrecision(4),
                id: 'mu',
                sortBy: Sorters.Numeric
            },
            {
                Header: 'Variance (sigma)',
                accessor: row => row.sigma_sq.toPrecision(4),
                id: 'sigma',
                sortBy: Sorters.Numeric
            },
            {
                Header: 'Skipped by',
                accessor: 'skippedByCount',
                sortBy: Sorters.Numeric
            },
            {
                Header: 'Viewed by',
                accessor: 'viewedByCount',
                sortBy: Sorters.Numeric
            },
            {
                Header: 'Status',
                accessor: row => {
                    return row.active ? 'active' : 'disabled';
                },
                id: 'active',
                ...Filters.SingleSelect
            }
        ];
    }, []);

    const data = useMemo(() => {
        return gavelProjects.map(project => {
            return {
                ...project,
                skippedByCount: project.skippedBy.length,
                viewedByCount: project.viewedBy.length
            };
        });
    }, [gavelProjects]);

    return <Table data={data} columns={columns} />;
};

export default GavelTable;
