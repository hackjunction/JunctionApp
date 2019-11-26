import React, { useMemo, useEffect } from 'react';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { find, sortBy } from 'lodash-es';
import { Box } from '@material-ui/core';

import CenteredContainer from 'components/generic/CenteredContainer';
import EventHeroImage from 'components/events/EventHeroImage';
import ProjectsGrid from 'components/projects/ProjectsGrid';

const GalleryTrack = ({ event, projects, match, onProjectSelected }) => {
    const track = useMemo(() => {
        if (!event || !event.tracks) return null;
        return find(event.tracks, track => {
            return track.slug === match.params.track;
        });
    }, [match, event]);

    const filtered = useMemo(() => {
        if (!track || !projects) return [];
        const data = projects.filter(project => {
            return project.track === track.slug;
        });
        return sortBy(data, project => {
            return -1 * project.description.length;
        });
    }, [projects, track]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <EventHeroImage
                event={event}
                overline={event.name}
                title={track.name}
                subheading={`${filtered.length} projects`}
            />
            <CenteredContainer>
                <Box mt={3} />
                <ProjectsGrid sortField={null} projects={filtered} event={event} onSelect={onProjectSelected} />
                <Box mt={5} />
            </CenteredContainer>
        </React.Fragment>
    );
};

const mapDispatch = (dispatch, ownProps) => ({
    onProjectSelected: project => dispatch(push(`/projects/${ownProps.event.slug}/view/${project._id}`))
});

export default connect(null, mapDispatch)(GalleryTrack);
