import React, { useState, useCallback } from 'react';

import { sortBy } from 'lodash-es';
import moment from 'moment-timezone';
import { Grid, Dialog } from '@material-ui/core';
import { EventHelpers } from '@hackjunction/shared';
import ProjectsGridItem from '../ProjectsGridItem';
import ProjectDetail from '../ProjectDetail';

const ProjectsGrid = ({ projects, event, sortField = 'location' }) => {
    const [selected, setSelected] = useState();
    const handleSelect = useCallback(project => {
        setSelected(project);
    }, []);

    const handleClose = useCallback(() => {
        setSelected();
    }, []);

    const isOngoingEvent = EventHelpers.isEventOngoing(event, moment);

    const sorted = sortBy(projects, p => p[sortField]);

    return (
        <Grid container spacing={3} direction="row" alignItems="stretch">
            <Dialog transitionDuration={0} fullScreen open={Boolean(selected)} onClose={handleClose}>
                <ProjectDetail
                    project={selected}
                    event={event}
                    onBack={handleClose}
                    showTableLocation={isOngoingEvent}
                />
            </Dialog>
            {sorted.map(project => (
                <ProjectsGridItem
                    project={project}
                    event={event}
                    showTableLocation={isOngoingEvent}
                    onClickMore={() => handleSelect(project)}
                />
            ))}
        </Grid>
    );
};

export default ProjectsGrid;
