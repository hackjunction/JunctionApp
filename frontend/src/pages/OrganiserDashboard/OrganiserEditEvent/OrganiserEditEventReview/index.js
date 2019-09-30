import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import PageHeader from 'components/generic/PageHeader';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import SearchAttendeesPage from './SearchAttendeesPage';
import AssignAttendeesPage from './AssignAttendeesPage';
import TeamsPage from './TeamsPage';
import AdminPage from './AdminPage';

const OrganiserEditEventReview = ({ event, organisers, registrationsLoading, updateData }) => {
    const [selectedKey, setSelectedKey] = useState('search');

    const renderSelectedKey = () => {
        switch (selectedKey) {
            case 'search':
                return <SearchAttendeesPage />;
            case 'teams':
                return <TeamsPage />;
            case 'assigned':
                return <AssignAttendeesPage />;
            case 'admin':
                return <AdminPage />;
            default:
                return null;
        }
    };

    return (
        <PageWrapper>
            <PageHeader heading="Participants" subheading="Search participants"/>
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
                        content: <h1>Travel grants</h1>
                    },
                    {
                        label: 'Admin & Tools',
                        content: <AdminPage />
                    },
                ]}
            />
        </PageWrapper>
    );
};

const mapState = state => ({
    organisers: OrganiserSelectors.organisers(state),
    event: OrganiserSelectors.event(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state)
});

export default connect(mapState)(OrganiserEditEventReview);
