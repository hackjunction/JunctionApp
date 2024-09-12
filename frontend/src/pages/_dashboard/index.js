import React from 'react'
import { useRouteMatch } from 'react-router'
import { Route, Switch, Redirect } from 'react-router-dom'
import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'
// import { useDispatch } from 'react-redux'

export default () => {
    const match = useRouteMatch()
    // const dispatch = useDispatch()

    //redirect to right event page, default, or out
    return (
        <Switch>
            <Route
                exact={false}
                path={
                    `${match.path}/event/:slug` /*TODO: pass correct event and role and create default case*/
                }
                component={SlugPage}
            />
            <Route
                exact={false}
                path={
                    `${match.path}/default` /*TODO: pass correct event and role and create default case*/
                }
                component={DefaultPage}
            />
            {/* For all other routes, redirect outta here */}
            <Redirect to="/home" />
        </Switch>
    )
}
