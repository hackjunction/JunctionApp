import React, { forwardRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Paper, Switch } from '@material-ui/core';
import MaterialTable from 'components/generic/MaterialTable';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const GavelAdmin = ({ event, gavelProjects, updateGavelProjects, editGavelProject }) => {
    const loading = false;
    useEffect(() => {
        updateGavelProjects(event.slug);
    }, [event.slug, updateGavelProjects]);

    const renderTable = (title, projects) => {
        return (
            <Box mb={2}>
                <MaterialTable
                    title={title}
                    showCount
                    isLoading={loading}
                    data={projects.map(project => {
                        return {
                            ...project,
                            skippedByCount: project.skippedBy.length,
                            viewedByCount: project.viewedBy.length
                        };
                    })}
                    options={{
                        exportButton: true,
                        selection: false,
                        showSelectAllCheckbox: false,
                        pageSizeOptions: [10, 25, 50],
                        debounceInterval: 500,
                        search: true,
                        paging: true,
                        pageSize: 50
                    }}
                    localization={{
                        toolbar: {
                            searchPlaceholder: 'Search projects',
                            nRowsSelected: '{0} selected'
                        }
                    }}
                    components={{
                        Container: forwardRef((props, ref) => <Paper {...props} ref={ref} />)
                    }}
                    columns={[
                        {
                            title: 'Name',
                            field: 'project.name',
                            searchable: true
                        },
                        {
                            title: 'Location',
                            field: 'project.location'
                        },
                        {
                            title: 'Mu',
                            field: 'mu',
                            type: 'numeric',
                            render: row => row.mu.toPrecision(4)
                        },
                        {
                            title: 'Sigma Sq.',
                            field: 'sigma_sq',
                            type: 'numeric',
                            render: row => row.sigma_sq.toPrecision(4)
                        },
                        {
                            title: 'Skipped by',
                            field: 'skippedByCount',
                            type: 'numeric'
                        },
                        {
                            title: 'Viewed by',
                            field: 'viewedByCount',
                            type: 'numeric'
                        },
                        {
                            title: 'Active',
                            field: 'active',
                            render: data => {
                                return (
                                    <Switch
                                        checked={data.active}
                                        onChange={(e, value) =>
                                            editGavelProject(event.slug, data._id, { active: value })
                                        }
                                        value="active"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                );
                            }
                        }
                    ]}
                />
            </Box>
        );
    };

    if (!event) return null;

    if (!event.tracks || !event.tracksEnabled) {
        return renderTable('All projects', gavelProjects);
    } else {
        return event.tracks.map(track => {
            const trackProjects = gavelProjects.filter(project => {
                return project.project && project.project.track === track.slug;
            });
            return renderTable(track.name, trackProjects);
        });
    }
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    gavelProjects: OrganiserSelectors.gavelProjectsPopulated(state)
});

const mapDispatch = dispatch => ({
    updateGavelProjects: slug => dispatch(OrganiserActions.updateGavelProjects(slug)),
    editGavelProject: (slug, projectId, edits) => dispatch(OrganiserActions.editGavelProject(slug, projectId, edits))
});

export default connect(mapState, mapDispatch)(GavelAdmin);
