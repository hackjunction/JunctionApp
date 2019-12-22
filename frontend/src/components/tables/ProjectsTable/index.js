import React, { forwardRef, useCallback, useState } from 'react'

import moment from 'moment-timezone'
import MaterialTable from 'components/generic/MaterialTable'
import ProjectDetail from 'components/projects/ProjectDetail'
import { Paper, Dialog } from '@material-ui/core'
import { EventHelpers } from '@hackjunction/shared'

const ProjectsTable = ({ event, projects, loading }) => {
    const [selected, setSelected] = useState()

    const handleSelect = useCallback(project => {
        setSelected(project)
    }, [])

    const handleClose = useCallback(() => {
        setSelected()
    }, [])

    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment)
    return (
        <React.Fragment>
            <MaterialTable
                title="Projects"
                showCount
                isLoading={loading}
                data={projects}
                onRowClick={(e, row) => handleSelect(row)}
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
                    pageSizeOptions: [5, 10, 25, 50],
                    debounceInterval: 500,
                    search: true,
                    paging: true,
                    pageSize: 10,
                }}
                localization={{
                    toolbar: {
                        searchPlaceholder: 'Search projects',
                        nRowsSelected: '{0} selected',
                    },
                }}
                components={{
                    Container: forwardRef((props, ref) => (
                        <Paper {...props} ref={ref} />
                    )),
                }}
                columns={[
                    {
                        title: 'Name',
                        field: 'name',
                        searchable: true,
                    },
                    {
                        title: 'Punchline',
                        field: 'punchline',
                        searchable: true,
                    },
                    {
                        title: 'Location',
                        field: 'location',
                    },
                ]}
            />
            <Dialog
                transitionDuration={0}
                fullScreen
                open={Boolean(selected)}
                onClose={handleClose}
            >
                <ProjectDetail
                    project={selected}
                    event={event}
                    onBack={handleClose}
                    showTableLocation={isOngoingEvent}
                />
            </Dialog>
        </React.Fragment>
    )
}

export default ProjectsTable
