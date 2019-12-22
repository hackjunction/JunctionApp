import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router'

import LoginDefault from './default'
import LoginWelcome from './welcome'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={LoginDefault} />
            <Route
                exact
                path={`${match.url}/welcome`}
                component={LoginWelcome}
            />
            <Redirect to={`${match.url}`} />
        </Switch>
    )
}
