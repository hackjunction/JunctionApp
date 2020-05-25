import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import DefaultPage from './default'
import HackerpackForm from './hackerpack'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={DefaultPage} />
            <Route
                exact={false}
                path={`${match.url}/:slug`}
                component={HackerpackForm}
            />
            <Redirect to={match.url} />
        </Switch>
    )
}
