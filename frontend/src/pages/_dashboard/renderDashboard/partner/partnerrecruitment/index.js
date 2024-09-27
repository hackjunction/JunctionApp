import React from 'react'
import { useRouteMatch } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import SearchPage from './default'
import DetailPage from './id'
// TODO rework admin page to allow partners to manage their own teams
// import AdminPage from './admin'

export default () => {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route exact={true} path={`${match.url}`} component={SearchPage} />
            <Route
                exact={false}
                path={`${match.url}/:id`}
                component={DetailPage}
            />
            {/* <Route exact={true} path=`${match.url}/recruitment/admin` component={AdminPage} /> */}
            <Redirect to={`${match.url}`} />
        </Switch>
    )
}
