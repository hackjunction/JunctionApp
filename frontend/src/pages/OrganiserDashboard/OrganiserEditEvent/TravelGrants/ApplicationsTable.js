import React from 'react';

import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { RegistrationTravelGrantStatuses as Statuses } from '@hackjunction/shared';

const getMuiTheme = () =>
    createMuiTheme({
        overrides: {
            MUIDataTableToolbar: {
                filterPaper: {
                    width: '100% !important',
                    maxWidth: '500px'
                }
            },
            MuiGridListTile: {
                root: {
                    minWidth: '100%'
                }
            }
        }
    });

const ApplicationsTable = React.memo(
    ({ data, onRowClick }) => {
        return (
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title="Submitted applications"
                    data={data}
                    options={{
                        selectableRows: 'none',
                        responsive: 'scrollFullHeight',
                        onRowClick: onRowClick
                    }}
                    columns={[
                        {
                            label: 'Name',
                            name: 'answers',
                            options: {
                                customBodyRender: value => `${value.firstName} ${value.lastName}`,
                                filter: false
                            }
                        },
                        {
                            label: 'Country of travel',
                            name: 'answers.countryOfTravel',
                            options: {
                                filter: true
                            }
                        },
                        {
                            label: 'Grant amount',
                            name: 'travelGrant',
                            options: {}
                        },
                        {
                            label: 'Grant status',
                            name: 'travelGrantStatus',
                            options: {
                                customBodyRender: value => {
                                    if (Statuses.asObject.hasOwnProperty(value)) {
                                        return Statuses.asObject[value].label;
                                    }
                                    return value;
                                },
                                filter: true
                            }
                        }
                    ]}
                />
            </MuiThemeProvider>
        );
    },
    (prevProps, nextProps) => {
        if (prevProps.data !== nextProps.data) {
            return false;
        }
        return true;
    }
);

export default ApplicationsTable;
