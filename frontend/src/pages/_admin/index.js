import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

import DefaultPage from './default'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={DefaultPage} />
            <Redirect to={match.url} />
        </Switch>
    )
}
