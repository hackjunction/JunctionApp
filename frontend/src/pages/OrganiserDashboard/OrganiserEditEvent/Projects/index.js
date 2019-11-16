import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PageWrapper from 'components/layouts/PageWrapper';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import PageHeader from 'components/generic/PageHeader';

import SearchTab from './Search';
import ChallengesTab from './Challenges';
import TracksTab from './Tracks';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';

const Projects = ({ event, projectsLoading, updateProjects, location, match }) => {
    useEffect(() => {
        updateProjects(event.slug);
    }, [event, updateProjects]);

    if (!event || projectsLoading) return <PageWrapper loading />;

    const tabs = [
        {
            path: '',
            key: 'all-projects',
            label: 'All projects',
            content: <SearchTab />
        }
    ];

    if (event.challengesEnabled && event.challenges.length > 0) {
        tabs.push({
            path: '/by-challenge',
            key: 'by-challenge',
            label: 'By challenge',
            content: <ChallengesTab />
        });
    }

    if (event.tracksEnabled && event.tracks.length > 0) {
        tabs.push({
            path: '/by-track',
            key: 'by-track',
            label: 'By track',
            content: <TracksTab />
        });
    }

    return (
        <PageWrapper>
            <PageHeader heading="Projects" subheading="All of the cool stuff people have made" />
            <MaterialTabsLayout transparent tabs={tabs} location={location} baseRoute={match.url} />
        </PageWrapper>
    );
};

const mapState = state => ({
    event: OrganiserSelectors.event(state),
    projectsLoading: OrganiserSelectors.projectsLoading(state)
});

const mapDispatch = dispatch => ({
    updateProjects: slug => dispatch(OrganiserActions.updateProjects(slug))
});

export default withRouter(connect(mapState, mapDispatch)(Projects));
