import React from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'

// import DefaultPage from './default'
import SlugPage from './index'

export default () => {
    const url = useResolvedPath("").pathname;
    return (
        <Switch>
            {/* <Route exact={true} path={`${match.url}`} component={DefaultPage} /> */}
            <Route
                exact={false}
                path={`${match.url}/:slug`}
                component={SlugPage}
            />
            <Redirect to={match.url} />
        </Switch>
    )
}
