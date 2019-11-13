import React, { useEffect, useMemo } from 'react';
import styles from './EventDashboard.module.scss';

import { connect } from 'react-redux';
import { EventTypes, RegistrationStatuses } from '@hackjunction/shared';
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

import * as AuthSelectors from 'redux/auth/selectors';
import * as DashboardSelectors from 'redux/dashboard/selectors';
import * as DashboardActions from 'redux/dashboard/actions';

const EventDashboard = ({
    match,
    location,
    updateEvent,
    updateRegistration,
    updateTeam,
    updateProfiles,
    event,
    team,
    eventLoading,
    registrationLoading,
    registration
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

    const showEventID = useMemo(() => {
        if (event.eventType !== EventTypes.physical.id) return false;
        const validStatuses = [RegistrationStatuses.asObject.confirmed.id, RegistrationStatuses.asObject.checkedIn.id];
        if (!registration || validStatuses.indexOf(registration.status) === -1) {
            return false;
        }

        return true;
    }, [event, registration]);

    return (
        <PageWrapper loading={eventLoading || registrationLoading} wrapContent={false}>
            <SidebarLayout
                baseRoute={match.url}
                location={location}
                sidebarTopContent={
                    <div className={styles.sidebarTop}>
                        <Image
                            className={styles.sidebarLogo}
                            publicId={event.logo ? event.logo.publicId : ''}
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
    registration: DashboardSelectors.registration(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(DashboardActions.updateEvent(slug)),
    updateRegistration: slug => dispatch(DashboardActions.updateRegistration(slug)),
    updateTeam: slug => dispatch(DashboardActions.updateTeam(slug)),
    updateProfiles: team => dispatch(DashboardActions.updateProfiles(team))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDashboard);
