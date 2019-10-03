import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import PageWrapper from 'components/PageWrapper';
import Divider from 'components/generic/Divider';
import MaterialTabsLayout from 'components/layouts/MaterialTabsLayout';
import PageHeader from 'components/generic/PageHeader';

import * as OrganiserSelectors from 'redux/organiser/selectors';

import SearchAttendeesPage from './Search';
import AssignAttendeesPage from './Assigned';
import TeamsPage from './Teams';
import AdminPage from './Admin';
import TravelGrantsPage from './Travel';

const OrganiserEditEventReview = ({ event, organisers, registrationsLoading, updateData }) => {
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

const mapState = state => ({
    organisers: OrganiserSelectors.organisers(state),
    event: OrganiserSelectors.event(state),
    registrationsLoading: OrganiserSelectors.registrationsLoading(state)
});

export default connect(mapState)(OrganiserEditEventReview);
