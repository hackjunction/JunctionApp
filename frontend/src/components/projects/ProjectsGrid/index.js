import React, { useState, useCallback } from 'react';

import { Grid, Dialog } from '@material-ui/core';
import ProjectsGridItem from '../ProjectsGridItem';
import ProjectDetail from '../ProjectDetail';

const ProjectsGrid = ({ projects }) => {
    const [selected, setSelected] = useState();
    const handleSelect = useCallback(project => {
        setSelected(project);
    }, []);

    const handleClose = useCallback(() => {
        setSelected();
    }, []);

    return (
        <React.Fragment>
            <Grid container spacing={3} direction="row" alignItems="stretch">
                {projects.map(project => (
                    <ProjectsGridItem project={project} onClickMore={() => handleSelect(project)} />
                ))}
            </Grid>
            <Dialog scroll="body" fullScreen open={Boolean(selected)} onClose={handleClose}>
                <ProjectDetail project={selected} onBack={handleClose} />
            </Dialog>
        </React.Fragment>
    );
};

export default ProjectsGrid;
