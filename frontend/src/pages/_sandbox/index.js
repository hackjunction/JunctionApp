import React from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'

import DefaultPage from './default'
import TeamPage from './team'
import ConfigurePage from './default/configure'

//TODO enable sandbox for new dashboard design
export default () => {
    const url = useResolvedPath("").pathname;
    return (
        <Routes>
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
            <Navigate to={match.url} />
        </Routes>
    )
}
