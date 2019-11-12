import React, { useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';

import PageWrapper from 'components/layouts/PageWrapper';
import GlobalNavBar from 'components/navbars/GlobalNavBar';
import Footer from 'components/layouts/Footer';
import * as EventDetailActions from 'redux/eventdetail/actions';
import * as EventDetailSelectors from 'redux/eventdetail/selectors';
import * as AuthSelectors from '../../redux/auth/selectors';

import EventDetail from './EventDetail';
import EventRegister from './EventRegister';

const EventDetailRouter = ({
    isAuthenticated,
    match,
    location,
    event,
    eventLoading,
    eventError,
    updateEvent,
    updateRegistration,
    registrationOpen
}) => {
    const { slug } = match.params;

    useEffect(() => {
        updateEvent(slug);
        if (isAuthenticated) {
            updateRegistration(slug);
        }
    }, [slug, updateEvent, updateRegistration, isAuthenticated]);

    return (
        <PageWrapper
            loading={eventLoading}
            error={eventError}
            errorText={`Oops, something went wrong`}
            errorDesc={`Please refresh the page to try again.`}
            header={() => <GlobalNavBar />}
            footer={() => <Footer />}
            render={() => {
                return (
                    <AnimatePresence>
                        <Switch location={location} key={location.pathname}>
                            <Route
                                exact
                                path={`${match.url}`}
                                component={() => <EventDetail slug={slug} match={match} location={location} />}
                            />
                            {registrationOpen && (
                                <Route
                                    exact
                                    path={`${match.url}/register`}
                                    component={() => <EventRegister slug={slug} />}
                                />
                            )}
                            <Redirect to={`${match.url}`} />
                        </Switch>
                    </AnimatePresence>
                );
            }}
        />
    );
};

const mapStateToProps = state => ({
    event: EventDetailSelectors.event(state),
    eventLoading: EventDetailSelectors.eventLoading(state),
    eventError: EventDetailSelectors.eventError(state),
    isAuthenticated: AuthSelectors.isAuthenticated(state),
    registrationOpen: EventDetailSelectors.isRegistrationOpen(state)
});

const mapDispatchToProps = dispatch => ({
    updateEvent: slug => dispatch(EventDetailActions.updateEvent(slug)),
    updateRegistration: slug => dispatch(EventDetailActions.updateRegistration(slug))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDetailRouter);
