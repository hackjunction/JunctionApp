import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import GlobalNavBar from 'components/navbars/GlobalNavBar';
import ProjectGallery from './Gallery';
import ProjectsChallengeAdminPage from './ChallengeAdmin';

import * as EventSelectors from 'redux/events/selectors';
import * as EventActions from 'redux/events/actions';

const ProjectsRouter = () => {
    return (
        <React.Fragment>
            <GlobalNavBar />
            <Switch>
                {routes.map(route => (
                    <Route key={route.path} {...route} />
                ))}
                <Redirect to="/" />
            </Switch>
        </React.Fragment>
    );
};

const routes = [
    {
        exact: false,
        path: '/projects/:slug/challenge/:token',
        component: ProjectsChallengeAdminPage
    },
    {
        exact: false,
        path: '/projects/:slug',
        component: ProjectGallery
    }
];

const mapState = state => ({
    events: EventSelectors.events(state)
});

const mapDispatch = dispatch => ({
    updateEvents: () => dispatch(EventActions.updateEvents())
});

export default connect(mapState, mapDispatch)(ProjectsRouter);
