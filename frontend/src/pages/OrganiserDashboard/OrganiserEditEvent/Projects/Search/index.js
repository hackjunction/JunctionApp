import React, { useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';

import MaterialTable from 'components/generic/MaterialTable';
import ProjectsTable from 'components/tables/ProjectsTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const SearchTab = ({ event, projects, projectsLoading }) => {
    return <ProjectsTable projects={projects} event={event} loading={projectsLoading} />;
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state)
});

export default connect(mapState)(SearchTab);
