import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import DefaultPage from './default'
import TeamPage from './team'
import ConfigurePage from './default/configure'
import FilesPage from './files'
//TODO enable sandbox for new dashboard design
export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={DefaultPage} />
            <Route
                exact={true}
                path={`${match.url}/configure`}
                component={ConfigurePage}
            />
            <Route
                exact={false}
                path={`${match.url}/:slug`}
                component={TeamPage}
            />
            <Redirect to={match.url} />
        </Switch>
    )
}
