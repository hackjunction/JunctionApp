import React, { useMemo } from 'react';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { find, sortBy } from 'lodash-es';
import { Box } from '@material-ui/core';

import CenteredContainer from 'components/generic/CenteredContainer';
import EventHeroImage from 'components/events/EventHeroImage';
import ProjectsGrid from 'components/projects/ProjectsGrid';

const GalleryChallenge = ({ event, projects, match, onProjectSelected }) => {
    const challenge = useMemo(() => {
        if (!event || !event.challenges) return null;
        return find(event.challenges, challenge => {
            return challenge.slug === match.params.challenge;
        });
    }, [match, event]);

    const filtered = useMemo(() => {
        if (!challenge || !projects) return [];
        const data = projects.filter(project => {
            return project.challenges.indexOf(challenge.slug) !== -1;
        });

        return sortBy(data, item => {
            return -1 * item.description.length;
        });
    }, [projects, challenge]);

    return (
        <React.Fragment>
            <EventHeroImage event={event} overline={event.name} title={challenge.partner} subheading={challenge.name} />
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

export default connect(null, mapDispatch)(GalleryChallenge);
