import React, { useMemo } from 'react';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { find } from 'lodash-es';
import { Box } from '@material-ui/core';

import CenteredContainer from 'components/generic/CenteredContainer';
import PageHeader from 'components/generic/PageHeader';
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
        return projects.filter(project => {
            return project.challenges.indexOf(challenge.slug) !== -1;
        });
    }, [projects, challenge]);

    return (
        <React.Fragment>
            <EventHeroImage event={event} overline={event.name} title={challenge.partner} subheading={challenge.name} />
            <CenteredContainer>
                <Box mt={3} />
                <ProjectsGrid projects={filtered} event={event} onSelect={onProjectSelected} />
                <Box mt={5} />
            </CenteredContainer>
        </React.Fragment>
    );
};

const mapDispatch = (dispatch, ownProps) => ({
    onProjectSelected: project => dispatch(push(`/projects/${ownProps.event.slug}/view/${project._id}`))
});

export default connect(null, mapDispatch)(GalleryChallenge);
