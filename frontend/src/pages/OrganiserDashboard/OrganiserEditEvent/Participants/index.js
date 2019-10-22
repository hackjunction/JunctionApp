import React from 'react';

import PageWrapper from 'components/PageWrapper';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import PageHeader from 'components/generic/PageHeader';

import SearchAttendeesPage from './Search';
import AssignAttendeesPage from './Assigned';
import TeamsPage from './Teams';
import AdminPage from './Admin';
import TravelGrantsPage from './Travel';

const OrganiserEditEventReview = () => {
    return (
        <PageWrapper>
            <PageHeader heading="Participants" subheading="Search participants" />
            <MaterialTabsLayout
                tabs={[
                    {
                        label: 'Participants',
                        content: <SearchAttendeesPage />
                    },
                    {
                        label: 'Teams',
                        content: <TeamsPage />
                    },
                    {
                        label: 'Assigned to you',
                        content: <AssignAttendeesPage />
                    },
                    {
                        label: 'Travel',
                        content: <TravelGrantsPage />
                    },
                    {
                        label: 'Admin & Tools',
                        content: <AdminPage />
                    }
                ]}
            />
        </PageWrapper>
    );
};

export default OrganiserEditEventReview;
