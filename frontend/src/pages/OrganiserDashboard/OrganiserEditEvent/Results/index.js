import React, { useMemo } from 'react';

import { withRouter } from 'react-router-dom';

import PageWrapper from 'components/layouts/PageWrapper';
import PageHeader from 'components/generic/PageHeader';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';

import OverviewTab from './OverviewTab';
import OverallTab from './OverallTab';
import TracksTab from './TracksTab';
import ChallengesTab from './ChallengesTab';

const ResultsPage = ({ event, projectsLoading, updateProjects, location, match }) => {
    const tabs = useMemo(() => {
        return [
            {
                path: '',
                key: 'overview',
                label: 'Overview',
                content: <OverviewTab />
            },
            {
                path: '/overall',
                key: 'overall',
                label: 'Overall',
                content: <OverallTab />
            },
            {
                path: '/tracks',
                key: 'tracks',
                label: 'Tracks',
                content: <TracksTab />
            },
            {
                path: '/challenges',
                key: 'challenges',
                label: 'Challenges',
                content: <ChallengesTab />
            }
        ];
    }, []);

    return (
        <PageWrapper>
            <PageHeader heading="Results" subheading="View and configure the rankings of projects" />
            <MaterialTabsLayout transparent tabs={tabs} location={location} baseRoute={match.url} />
        </PageWrapper>
    );
};

export default withRouter(ResultsPage);
