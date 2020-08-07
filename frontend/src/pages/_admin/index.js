import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import DefaultPage from './default'
import HackerpackForm from './hackerpack'
import OrganizationForm from './organization'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={DefaultPage} />
            <Route
                exact={false}
                path={`${match.url}/hackerpack/:slug`}
                component={HackerpackForm}
            />
            <Route
                exact={false}
                path={`${match.url}/organization/:slug`}
                component={OrganizationForm}
            />
            <Redirect to={match.url} />
        </Switch>
    )
}
