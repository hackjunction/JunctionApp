import React from 'react';

import { sortBy } from 'lodash-es';
import moment from 'moment-timezone';
import { Grid } from '@material-ui/core';
import { EventHelpers } from '@hackjunction/shared';
import ProjectsGridItem from '../ProjectsGridItem';

const ProjectsGrid = ({ projects, event, onSelect, sortField = 'location' }) => {
    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment);
    const sorted = sortField ? sortBy(projects, p => p[sortField]) : projects;

    return (
        <Grid container spacing={3} direction="row" alignItems="stretch" justify="center">
            {sorted.map(project => (
                <ProjectsGridItem
                    project={project}
                    event={event}
                    showTableLocation={isOngoingEvent}
                    onClickMore={() => onSelect(project)}
                />
            ))}
        </Grid>
    );
};

export default ProjectsGrid;
