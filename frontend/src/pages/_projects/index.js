import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useRouteMatch } from 'react-router'

import GlobalNavBar from 'components/navbars/GlobalNavBar'
import ProjectGallery from './slug'

export default () => {
    const match = useRouteMatch()

    return (
        <>
            <GlobalNavBar />
            <Switch>
                <Route
                    exact={false}
                    path={`${match.url}/:slug`}
                    component={ProjectGallery}
                />
                <Redirect to="/" />
            </Switch>
        </>
    )
}
