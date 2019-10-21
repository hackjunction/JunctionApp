import React, { useState, useEffect, Suspense } from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import { Route, Redirect, Switch } from 'react-router-dom';

import routeConfig from './routes';

import * as AuthSelectors from 'redux/auth/selectors';
import { renewSession } from 'redux/auth/actions';
import AnalyticsService from 'services/analytics';

const App = ({ isAuthenticated, isSessionExpired, renewSession, history, location }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AnalyticsService.init();
        AnalyticsService.pageView(window.location);
        const unlisten = history.listen(AnalyticsService.pageView);

        return () => {
            unlisten();
        };
    }, [location, history]);

    useEffect(() => {
        if (isAuthenticated) {
            if (isSessionExpired) {
                setLoading(true);
                renewSession().then(() => {
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, isSessionExpired, renewSession]);

    return (
        <ConnectedRouter history={history}>
            <Suspense fallback={null}>
                {!loading && (
                    <Switch>
                        {routeConfig.routes.map(route => (
                            <Route key={route.path} {...route} />
                        ))}
                        {/**
                         * Miscellaneous
                         * TODO: 404 page
                         */}
                        <Redirect to="/" />
                    </Switch>
                )}
            </Suspense>
        </ConnectedRouter>
    );
};

const mapStateToProps = state => ({
    isSessionExpired: AuthSelectors.isSessionExpired(state),
    isAuthenticated: AuthSelectors.isAuthenticated(state)
});

export default connect(
    mapStateToProps,
    { renewSession }
)(App);
