import React, { useState, useEffect, useCallback } from 'react';
import styles from './OrganiserEditEvent.module.scss';

import { connect } from 'react-redux';

import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import * as OrganiserActions from 'redux/organiser/actions';
import PageWrapper from 'components/PageWrapper';
import Image from 'components/generic/Image';
import EventNavBar from 'components/navbars/EventNavBar';
import OrganiserEditEventDetails from './OrganiserEditEventDetails';
import OrganiserEditEventStats from './OrganiserEditEventStats';
import OrganiserEditEventReview from './OrganiserEditEventReview';
import OrganiserEditEventManage from './OrganiserEditEventManage';
import OrganiserEditEventGrants from './OrganiserEditEventGrants';
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
                renderSidebarTop={collapsed => {
                    if (collapsed) return null;
                    return (
                        <div className={styles.sidebarTop}>
                            <Image
                                className={styles.sidebarLogo}
                                publicId={event.logo ? event.logo.publicId : ''}
                                transformation={{
                                    width: 200
                                }}
                            />
                        </div>
                    );
                }}
                renderTop={() => {
                    return <EventNavBar />;
                }}
                baseRoute={match.url}
                location={location}
                routes={[
                    {
                        path: '',
                        icon: 'home',
                        label: 'Edit',
                        render: routeProps => <OrganiserEditEventDetails {...routeProps} slug={slug} />
                    },
                    {
                        path: '/stats',
                        icon: 'line-chart',
                        label: 'Stats',
                        render: routeProps => <OrganiserEditEventStats {...routeProps} slug={slug} />
                    },
                    {
                        path: '/review',
                        icon: 'star',
                        label: 'Review',
                        render: routeProps => (
                            <OrganiserEditEventReview {...routeProps} slug={slug} updateData={updateData} />
                        )
                    },
                    {
                        path: '/grants',
                        icon: 'star',
                        label: 'Travel Grants',
                        render: routeProps => <OrganiserEditEventGrants {...routeProps} slug={slug} />
                    },
                    {
                        path: '/manage',
                        icon: 'setting',
                        label: 'Manage',
                        render: routeProps => <OrganiserEditEventManage {...routeProps} slug={slug} />
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
