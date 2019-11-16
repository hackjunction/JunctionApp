import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import Select from 'components/inputs/Select';
import ProjectsTable from 'components/tables/ProjectsTable';

import * as OrganiserSelectors from 'redux/organiser/selectors';

const TracksTab = ({ event, projects, projectsLoading }) => {
    const [track, setTrack] = useState(event.tracks[0].slug);

    const filtered = useMemo(() => {
        return projects.filter(project => {
            return project.track && project.track === track;
        });
    }, [projects, track]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 500 }}>
                <Select
                    label="Choose track"
                    options={event.tracks.map(track => ({
                        label: track.name,
                        value: track.slug
                    }))}
                    value={track}
                    onChange={setTrack}
                />
            </Grid>
            <Grid item xs={12}>
                <ProjectsTable projects={filtered} event={event} loading={projectsLoading} />
            </Grid>
        </Grid>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projects: OrganiserSelectors.projects(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state)
});

export default connect(mapState)(TracksTab);
