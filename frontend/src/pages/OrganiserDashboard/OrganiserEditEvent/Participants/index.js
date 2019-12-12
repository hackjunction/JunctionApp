import React from 'react';

import { withRouter } from 'react-router';
import PageWrapper from 'components/layouts/PageWrapper';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import PageHeader from 'components/generic/PageHeader';

import SearchAttendeesPage from './Search';
import AssignAttendeesPage from './Assigned';
import TeamsPage from './Teams';
import AdminPage from './Admin';
import TravelGrantsPage from './Travel';

const OrganiserEditEventReview = ({ match, location }) => {
    return (
        <PageWrapper>
            <PageHeader heading="Participants" subheading="Search participants" />
            <MaterialTabsLayout
                transparent
                baseRoute={match.url}
                location={location}
                tabs={[
                    {
                        label: 'Participants',
                        path: '',
                        key: 'participants',
                        component: SearchAttendeesPage
                    },
                    {
                        path: '/teams',
                        key: 'teams',
                        label: 'Teams',
                        component: TeamsPage
                    },
                    {
                        path: '/assigned',
                        key: 'assigned',
                        label: 'Assigned to you',
                        component: AssignAttendeesPage
                    },
                    {
                        path: '/travel',
                        key: 'travel',
                        label: 'Travel',
                        component: TravelGrantsPage
                    },
                    {
                        path: '/admin',
                        key: 'admin',
                        label: 'Admin & Tools',
                        component: AdminPage
                    }
                ]}
            />
        </PageWrapper>
    );
};

export default withRouter(OrganiserEditEventReview);
