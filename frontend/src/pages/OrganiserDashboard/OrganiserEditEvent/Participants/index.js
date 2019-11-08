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
                baseRoute={match.url}
                location={location}
                tabs={[
                    {
                        label: 'Participants',
                        path: '',
                        key: 'participants',
                        content: <SearchAttendeesPage />
                    },
                    {
                        path: '/teams',
                        key: 'teams',
                        label: 'Teams',
                        content: <TeamsPage />
                    },
                    {
                        path: '/assigned',
                        key: 'assigned',
                        label: 'Assigned to you',
                        content: <AssignAttendeesPage />
                    },
                    {
                        path: '/travel',
                        key: 'travel',
                        label: 'Travel',
                        content: <TravelGrantsPage />
                    },
                    {
                        path: '/admin',
                        key: 'admin',
                        label: 'Admin & Tools',
                        content: <AdminPage />
                    }
                ]}
            />
        </PageWrapper>
    );
};

export default withRouter(OrganiserEditEventReview);
