import React, { useEffect } from 'react';
import styles from './EventDashboard.module.scss';

import { connect } from 'react-redux';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import StarRateIcon from '@material-ui/icons/StarRate';

import SidebarLayout from 'components/layouts/SidebarLayout';
import Image from 'components/generic/Image';
import BasicNavBar from 'components/navbars/BasicNavBar';
import PageWrapper from 'components/layouts/PageWrapper';

import EventDashboardHome from './EventDashboardHome';
import EventDashboardTeam from './EventDashboardTeam';
import EventDashboardId from './EventDashboardId';
import EventDashboardTravelGrant from './EventDashboardTravelGrant';
import EventDashboardSubmission from './EventDashboardSubmission';
import EventDashboardReviewing from './EventDashboardReviewing';
import Hackerpack from './Hackerpack';

import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const EventDashboard = ({
    match,
    location,
    updateEvent,
    updateRegistration,
    updateTeam,
    updateProject,
    event,
    team,
    eventLoading,
    registrationLoading,
    registration,
    showEventID,
    showSubmission,
    showReviewing,
    showTravelGrant,
    showHackerPack,
    isSubmissionsLocked,
    isTeamPageLocked,
    isReviewingLocked
}) => {
    const { slug } = match.params;

    /** Update event if slug changes */
    useEffect(() => {
        updateEvent(slug);
    }, [slug, updateEvent]);

    /** Update registration if slug changes */
    useEffect(() => {
        updateRegistration(slug);
    }, [slug, updateRegistration]);

    /** Update team if slug changes */
    useEffect(() => {
        updateTeam(slug);
    }, [slug, updateTeam]);

    /** Update project if slug changes */
    useEffect(() => {
        updateProject(slug);
    }, [slug, team, updateProject]);

    return (
        <PageWrapper loading={eventLoading || registrationLoading} wrapContent={false}>
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={
                    <div className={styles.sidebarTop}>
                        <Image
                            className={styles.sidebarLogo}
                            publicId={event && event.logo ? event.logo.publicId : ''}
                            transformation={{
                                width: 200
                            }}
                        />
                    </div>
                }
                topContent={<BasicNavBar />}
                routes={[
                    {
                        key: 'dashboard',
                        path: '',
                        exact: true,
                        icon: <DashboardIcon />,
                        label: 'Dashboard',
                        component: EventDashboardHome
                    },
                    {
                        key: 'team',
                        path: '/team',
                        exact: true,
                        icon: <GroupIcon />,
                        label: 'Team',
                        locked: isTeamPageLocked,
                        lockedDescription: 'Team editing not open',
                        component: EventDashboardTeam
                    },
                    {
                        key: 'project',
                        path: '/project',
                        exact: true,
                        locked: isSubmissionsLocked,
                        lockedDescription: 'Submissions not open',
                        hidden: !showSubmission,
                        icon: <AssignmentOutlinedIcon />,
                        label: 'Project submission',
                        component: EventDashboardSubmission
                    },
                    {
                        key: 'reviewing',
                        path: '/reviewing',
                        exact: true,
                        hidden: !showReviewing,
                        locked: isReviewingLocked,
                        lockedDescription: 'Reviewing closed',
                        icon: <StarRateIcon />,
                        label: 'Reviewing',
                        component: EventDashboardReviewing
                    },
                    {
                        key: 'eventid',
                        path: '/event-id',
                        exact: true,
                        hidden: !showEventID,
                        icon: <FingerprintIcon />,
                        label: 'Event ID',
                        component: EventDashboardId
                    },
                    {
                        key: 'travelgrant',
                        path: '/travel-grant',
                        exact: true,
                        icon: <FlightTakeoffIcon />,
                        hidden: !showTravelGrant,
                        label: 'Travel grant',
                        component: EventDashboardTravelGrant
                    },
                    {
                        key: 'hackerpack',
                        path: '/hackerpack',
                        exact: true,
                        icon: <AmpStoriesIcon />,
                        hidden: !showHackerPack,
                        label: 'Hackerpack',
                        component: Hackerpack
                    }
                ]}
            />
        </PageWrapper>
    );
};

const mapStateToProps = state => ({
    idToken: AuthSelectors.getIdToken(state),
    event: DashboardSelectors.event(state),
    eventLoading: DashboardSelectors.eventLoading(state),
    eventError: DashboardSelectors.eventError(state),
    team: DashboardSelectors.team(state),
    registrationLoading: DashboardSelectors.registrationLoading(state),
    registration: DashboardSelectors.registration(state),
    showEventID: DashboardSelectors.showEventID(state),
    showSubmission: DashboardSelectors.showSubmission(state),
    showReviewing: DashboardSelectors.showReviewing(state),
    showTravelGrant: DashboardSelectors.showTravelGrant(state),
    showHackerPack: DashboardSelectors.showHackerPack(state),
    isSubmissionsLocked: DashboardSelectors.isSubmissionsLocked(state),
    isReviewingLocked: DashboardSelectors.isReviewingLocked(state),
    isTeamPageLocked: DashboardSelectors.isTeamPageLocked(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(DashboardActions.updateEvent(slug)),
    updateRegistration: slug => dispatch(DashboardActions.updateRegistration(slug)),
    updateTeam: slug => dispatch(DashboardActions.updateTeam(slug)),
    updateProject: slug => dispatch(DashboardActions.updateProject(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
