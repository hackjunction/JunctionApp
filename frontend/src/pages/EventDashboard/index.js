import React, { useEffect } from 'react';
import styles from './EventDashboard.module.scss';

import { connect } from 'react-redux';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import SidebarLayout from 'components/layouts/SidebarLayout';
import Image from 'components/generic/Image';
import BasicNavBar from 'components/navbars/BasicNavBar';
import PageWrapper from 'components/layouts/PageWrapper';

import EventDashboardHome from './EventDashboardHome';
import EventDashboardTeam from './EventDashboardTeam';
import EventDashboardId from './EventDashboardId';
import EventDashboardSubmission from './EventDashboardSubmission';

import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const EventDashboard = ({
    match,
    location,
    updateEvent,
    updateRegistration,
    updateTeam,
    event,
    team,
    eventLoading,
    registrationLoading,
    registration,
    showEventID,
    showSubmission
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
                        component: EventDashboardTeam
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
                        key: 'project',
                        path: '/project',
                        exact: true,
                        hidden: !showSubmission,
                        icon: <FingerprintIcon />,
                        label: 'Project submission',
                        component: EventDashboardSubmission
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
    showEventId: DashboardSelectors.showEventID(state),
    showSubmission: DashboardSelectors.showSubmission(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(DashboardActions.updateEvent(slug)),
    updateRegistration: slug => dispatch(DashboardActions.updateRegistration(slug)),
    updateTeam: slug => dispatch(DashboardActions.updateTeam(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
