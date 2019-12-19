import React, { useEffect, useCallback } from 'react';

import { connect } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { EventTypes } from '@hackjunction/shared';
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import CropFreeIcon from '@material-ui/icons/CropFree';
import CodeIcon from '@material-ui/icons/Code';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AssessmentIcon from '@material-ui/icons/Assessment';

import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import PageWrapper from 'components/layouts/PageWrapper';
import Image from 'components/generic/Image';
import BasicNavBar from 'components/navbars/BasicNavBar';

import DetailsPage from './Details';
import StatsPage from './Stats';
import ParticipantsPage from './Participants';
import ManagePage from './Manage';
import CheckInPage from './CheckIn';
import ProjectsPage from './Projects';
import TravelGrantsPage from './TravelGrants';
import ResultsPage from './Results';
import SidebarLayout from 'components/layouts/SidebarLayout';

const OrganiserEditEvent = ({
    updateEvent,
    updateOrganiserProfiles,
    updateRegistrations,
    updateTeams,
    updateFilterGroups,
    updateProjects,
    updateGavelProjects,
    updateRankings,
    loading,
    error,
    event,
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
            updateProjects(slug);
            updateGavelProjects(slug);
            updateRankings(slug);
        }
    }, [
        slug,
        event.owner,
        event.organisers,
        updateTeams,
        updateRegistrations,
        updateOrganiserProfiles,
        updateFilterGroups,
        updateProjects,
        updateGavelProjects,
        updateRankings
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
                topContent={<BasicNavBar text={event.name} />}
                baseRoute={match.url}
                location={location}
                routes={[
                    {
                        key: 'edit',
                        path: '/edit',
                        icon: <TuneIcon />,
                        label: 'Edit',
                        component: DetailsPage
                    },
                    {
                        key: 'stats',
                        path: '/stats',
                        exact: true,
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
                        key: 'projects',
                        path: '/projects',
                        icon: <CodeIcon />,
                        label: 'Projects',
                        component: ProjectsPage
                    },
                    {
                        key: 'results',
                        path: '/results',
                        icon: <AssessmentIcon />,
                        label: 'Results',
                        component: ResultsPage
                    },
                    {
                        key: 'checkin',
                        path: '/check-in',
                        exact: true,
                        locked: event.eventType !== EventTypes.physical.id,
                        lockedDescription: 'Only for physical events',
                        icon: <CropFreeIcon />,
                        label: 'Check-in',
                        component: CheckInPage
                    },
                    {
                        key: 'travel-grants',
                        path: '/travel-grants',
                        exact: true,
                        icon: <FlightTakeoffIcon />,
                        label: 'Travel grants',
                        component: TravelGrantsPage
                    },
                    {
                        key: 'manage',
                        path: '/manage',
                        exact: true,
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
    updateFilterGroups: slug => dispatch(OrganiserActions.updateFilterGroups(slug)),
    updateProjects: slug => dispatch(OrganiserActions.updateProjects(slug)),
    updateGavelProjects: slug => dispatch(OrganiserActions.updateGavelProjects(slug)),
    updateRankings: slug => dispatch(OrganiserActions.updateRankings(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganiserEditEvent);
