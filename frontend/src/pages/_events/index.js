import React from 'react'

import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router'

import EventDetailRouter from './slug'
import PastEvents from './past'
import EventTracking from './slug/tracking'

export default () => {
    const match = useRouteMatch()

    return (
        <Switch>
            <Route
                exact
                path={`${match.url}/:slug/tracking/:pageId`}
                component={EventTracking}
            />
            <Route path={`${match.url}/:slug`} component={EventDetailRouter} />
            {/** TODO: Consider adding a generic list of events at /events */}
            <Route path="/events" component={PastEvents} />
            <Redirect to="/" />
        </Switch>
    )
}
