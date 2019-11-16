import React, { useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import MaterialTable from 'components/generic/MaterialTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const SearchTab = ({ event, projects, projectsLoading }) => {
    return (
        <MaterialTable
            title="Projects"
            showCount
            isLoading={projectsLoading}
            data={projects}
            // onRowClick={(e, row) => setEditing(row.user)}
            // onSelectionChange={rows => setSelected(rows.map(r => r.user))}
            // actions={
            //     !minimal
            //         ? [
            //               {
            //                   icon: forwardRef((props, ref) => <EmailIcon {...props} ref={ref} />),
            //                   tooltip: 'Email selected',
            //                   onClick: toggleBulkEmail
            //               },
            //               {
            //                   icon: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
            //                   tooltip: 'Edit selected',
            //                   onClick: toggleBulkEdit
            //               }
            //           ]
            //         : []
            // }
            options={{
                exportButton: true,
                selection: false,
                showSelectAllCheckbox: false,
                pageSizeOptions: [5, 25, 50],
                debounceInterval: 500,
                search: true,
                paging: true
            }}
            localization={{
                toolbar: {
                    searchPlaceholder: 'Search by name/email',
                    nRowsSelected: '{0} selected'
                }
            }}
            components={{
                Container: forwardRef((props, ref) => <Paper {...props} ref={ref} />)
            }}
            columns={[
                {
                    title: 'Name',
                    field: 'name',
                    searchable: true
                },
                {
                    title: 'Location',
                    field: 'location',
                    searchable: true
                },
                {
                    title: 'Punchline',
                    field: 'punchline',
                    searchable: true
                }
            ]}
        />
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state)
});

export default connect(mapState)(SearchTab);
