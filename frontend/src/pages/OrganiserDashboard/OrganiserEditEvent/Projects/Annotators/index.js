import React, { forwardRef, useEffect } from 'react';

import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { Paper, Switch } from '@material-ui/core';
import MaterialTable from 'components/generic/MaterialTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const Annotators = ({ event, annotators, annotatorsLoading, updateAnnotators, editGavelAnnotator }) => {
    useEffect(() => {
        updateAnnotators(event.slug);
    }, [updateAnnotators, event.slug]);

    console.log('ANNOTATORs', annotators);

    return (
        <MaterialTable
            title="Annotators"
            showCount
            isLoading={annotatorsLoading}
            data={annotators}
            // onRowClick={(e, row) => handleSelect(row)}
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
                pageSizeOptions: [10, 25, 50],
                debounceInterval: 500,
                search: true,
                paging: true,
                pageSize: 10
            }}
            localization={{
                toolbar: {
                    searchPlaceholder: 'Search annotators',
                    nRowsSelected: '{0} selected'
                }
            }}
            components={{
                Container: forwardRef((props, ref) => <Paper {...props} ref={ref} />)
            }}
            columns={[
                {
                    title: 'User',
                    field: 'user'
                },
                {
                    title: 'Alpha',
                    field: 'alpha',
                    type: 'numeric',
                    render: row => row.alpha.toPrecision(4)
                },
                {
                    title: 'Beta',
                    field: 'beta',
                    type: 'numeric',
                    render: row => row.beta.toPrecision(4)
                },
                {
                    title: 'Seen',
                    field: 'ignore',
                    render: row => row.ignore.length
                },
                {
                    title: 'Skipped',
                    field: 'skipped',
                    render: row => row.skipped.length
                },
                {
                    title: 'Updated',
                    field: 'updatedAt',
                    type: 'date'
                },
                {
                    title: 'Active',
                    field: 'active',
                    render: data => {
                        return (
                            <Switch
                                checked={data.active}
                                onChange={(e, value) => editGavelAnnotator(event.slug, data._id, { active: value })}
                                value="active"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        );
                    }
                }

                // {
                //     title: 'Active',
                //     field: 'active',
                //     render: data => {
                //         return (
                //             <Switch
                //                 checked={data.active}
                //                 onChange={(e, value) => editGavelProject(event.slug, data._id, { active: value })}
                //                 value="active"
                //                 inputProps={{ 'aria-label': 'primary checkbox' }}
                //             />
                //         );
                //     }
                // }
            ]}
        />
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    annotatorsLoading: OrganiserSelectors.gavelAnnotatorsLoading(state),
    annotators: OrganiserSelectors.gavelAnnotators(state)
});

const mapDispatch = dispatch => ({
    updateAnnotators: slug => dispatch(OrganiserActions.updateGavelAnnotators(slug)),
    editGavelAnnotator: (slug, annotatorId, edits) =>
        dispatch(OrganiserActions.editGavelAnnotator(slug, annotatorId, edits))
});

export default connect(mapState, mapDispatch)(Annotators);
