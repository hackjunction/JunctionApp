import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import SlugPage from './slug'
import TeamProfilePage from './slug/team/profile'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route
                exact={false}
                path={`${match.path}/:slug`}
                component={SlugPage}
            />
            {/* For all other routes, redirect outta here */}
            <Redirect to="/" />
        </Switch>
    )
}
