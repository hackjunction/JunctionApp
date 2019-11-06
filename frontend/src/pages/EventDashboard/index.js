import React, { useEffect } from 'react';
import styles from './EventDashboard.module.scss';

import { connect } from 'react-redux';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';

import SidebarLayout from 'components/layouts/SidebarLayout';
import Image from 'components/generic/Image';
import BasicNavBar from 'components/navbars/BasicNavBar';
import PageWrapper from 'components/layouts/PageWrapper';

import EventDashboardHome from './EventDashboardHome';
import EventDashboardTeam from './EventDashboardTeam';

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
    registrationLoading
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
                            publicId={event.logo ? event.logo.publicId : ''}
                            transformation={{
                                width: 200
                            }}
                        />
                    </div>
                }
                topContent={<BasicNavBar text={event.name} />}
                routes={[
                    {
                        key: 'dashboard',
                        path: '',
                        icon: <DashboardIcon />,
                        label: 'Dashboard',
                        component: EventDashboardHome
                    },
                    {
                        key: 'team',
                        path: '/team',
                        icon: <GroupIcon />,
                        label: 'Team',
                        component: EventDashboardTeam
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
    registrationLoading: DashboardSelectors.registrationLoading(state)
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
