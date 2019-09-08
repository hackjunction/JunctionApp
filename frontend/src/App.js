import React, { useState, useEffect, Suspense } from 'react';

import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';

import { Route, Redirect, Switch } from 'react-router-dom';

import routeConfig from './routes';

import * as AuthSelectors from 'redux/auth/selectors';
import { renewSession } from 'redux/auth/actions';

const App = ({ isAuthenticated, isSessionExpired, renewSession, history }) => {
    const [loading, setLoading] = useState(true);

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
