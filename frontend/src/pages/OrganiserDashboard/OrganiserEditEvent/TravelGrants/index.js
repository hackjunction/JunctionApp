import React, { useState } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { useLocation, useHistory, useRouteMatch } from 'react-router';
import { Typography, Dialog } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { RegistrationTravelGrantStatuses as Statuses } from '@hackjunction/shared';

import PageHeader from 'components/generic/PageHeader';
import CenteredContainer from 'components/generic/CenteredContainer';

import * as OrganiserSelectors from 'redux/organiser/selectors';

const TravelGrantsPage = ({ items }) => {
    const location = useLocation();
    const history = useHistory();
    const params = new URLSearchParams(location.search);
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

    const activeIdx = params.get('view');
    const activeRow = activeIdx ? items[activeIdx] : null;

    return (
        <>
            <PageHeader heading="Travel Grants" subheading="Manage travel grants" />
            <MuiThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title="Submitted applications"
                    data={items}
                    options={{
                        selectableRows: 'none',
                        responsive: 'scrollFullHeight',
                        onRowClick: (data, rowMeta) => {
                            history.push(location.pathname + '?view=' + rowMeta.dataIndex);
                        }
                    }}
                    columns={[
                        {
                            label: 'ID',
                            name: '_id',
                            options: {
                                empty: true
                            }
                        },
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
            <Dialog fullScreen open={Boolean(activeRow)} onClose={() => history.goBack()}>
                {activeRow && (
                    <CenteredContainer>
                        <PageHeader heading="Details" subheading={activeRow._id} />
                    </CenteredContainer>
                )}
            </Dialog>
        </>
    );
};

const mapState = state => ({
    items: OrganiserSelectors.registrationsWithTravelGrant(state)
});

export default connect(mapState)(TravelGrantsPage);
