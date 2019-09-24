import React, { useState, useEffect } from 'react';
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

const OrganiserEditEvent = ({ updateEvent, updateOrganiserProfiles, event, user, match, location }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        updateEvent(slug)
            .catch(err => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [updateEvent, slug]);

    useEffect(() => {
        updateOrganiserProfiles(event.owner, event.organisers);
    }, [event.owner, event.organisers, updateOrganiserProfiles]);

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
                        render: routeProps => <OrganiserEditEventReview {...routeProps} slug={slug} />
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
    event: OrganiserSelectors.event(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(OrganiserActions.updateEvent(slug)),
    updateOrganiserProfiles: (owner, organisers) =>
        dispatch(OrganiserActions.updateOrganisersForEvent(owner, organisers))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrganiserEditEvent);
