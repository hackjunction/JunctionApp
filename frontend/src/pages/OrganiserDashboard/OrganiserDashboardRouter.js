import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import OrganiserEventList from 'pages/OrganiserDashboard/OrganiserEventList';
import OrganiserEditEvent from 'pages/OrganiserDashboard/OrganiserEditEvent';

class OrganiserRouter extends Component {
    static propTypes = {
        match: PropTypes.any.isRequired
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    {routes.map(route => (
                        <Route key={route.path} {...route} />
                    ))}
                    <Redirect to="/organise" />
                </Switch>
            </React.Fragment>
        );
    }
}

const routes = [
    {
        exact: true,
        path: '/organise',
        component: OrganiserEventList
    },
    {
        exact: false,
        path: '/organise/:slug',
        component: OrganiserEditEvent
    }
];

export default OrganiserRouter;
