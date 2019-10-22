import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import PageWrapper from 'components/layouts/PageWrapper';
import Image from 'components/generic/Image';
import EventNavBar from 'components/navbars/EventNavBar';

import DetailsPage from './Details';
import StatsPage from './Stats';
import ParticipantsPage from './Participants';
import ManagePage from './Manage';
import SidebarLayout from 'components/layouts/SidebarLayout';

const OrganiserEditEvent = ({
    updateEvent,
    updateOrganiserProfiles,
    updateRegistrations,
    updateTeams,
    updateFilterGroups,
    loading,
    error,
    event,
    user,
    match,
    location
}) => {
    const { slug } = match.params;

    useEffect(() => {
        updateEvent(slug);
    }, [slug, updateEvent]);

    const updateData = useCallback(() => {
        if (event.owner) {
            updateOrganiserProfiles(event.owner, event.organisers);
            updateRegistrations(slug);
            updateTeams(slug);
            updateFilterGroups(slug);
        }
    }, [
        slug,
        event.owner,
        event.organisers,
        updateTeams,
        updateRegistrations,
        updateOrganiserProfiles,
        updateFilterGroups
    ]);

    useEffect(() => {
        updateData();
    }, [updateData]);

    return (
        <PageWrapper loading={loading} error={error}>
            <SidebarLayout
                sidebarTopContent={
                    <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Image
                            publicId={event.logo ? event.logo.publicId : ''}
                            transformation={{
                                width: 200
                            }}
                        />
                        <Typography variant="button" style={{ color: 'white' }}>
                            Admin
                        </Typography>
                    </Box>
                }
                topContent={<EventNavBar />}
                baseRoute={match.url}
                location={location}
                routes={[
                    {
                        key: 'edit',
                        path: '',
                        icon: <TuneIcon />,
                        label: 'Edit',
                        component: DetailsPage
                    },
                    {
                        key: 'stats',
                        path: '/stats',
                        icon: <EqualizerIcon />,
                        label: 'Stats',
                        component: StatsPage
                    },
                    {
                        key: 'participants',
                        path: '/participants',
                        icon: <PeopleIcon />,
                        label: 'Participants',
                        component: ParticipantsPage
                    },
                    {
                        key: 'manage',
                        path: '/manage',
                        icon: <SettingsIcon />,
                        label: 'Manage',
                        component: ManagePage
                    }
                ]}
            />
        </PageWrapper>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    user: AuthSelectors.getCurrentUser(state),
    event: OrganiserSelectors.event(state),
    loading: OrganiserSelectors.eventLoading(state),
    error: OrganiserSelectors.eventError(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(OrganiserActions.updateEvent(slug)),
    updateOrganiserProfiles: (owner, organisers) =>
        dispatch(OrganiserActions.updateOrganisersForEvent(owner, organisers)),
    updateRegistrations: slug => dispatch(OrganiserActions.updateRegistrationsForEvent(slug)),
    updateTeams: slug => dispatch(OrganiserActions.updateTeamsForEvent(slug)),
    updateFilterGroups: slug => dispatch(OrganiserActions.updateFilterGroups(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEvent);
