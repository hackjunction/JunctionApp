import React from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'

// import DefaultPage from './default'
import SlugPage from './index'

export default () => {
    const url = useResolvedPath("").pathname;
    return (
        <Routes>
            {/* <Route exact={true} path={`${match.url}`} component={DefaultPage} /> */}
            <Route
                exact={false}
                path={`${match.url}/:slug`}
                component={SlugPage}
            />
            <Navigate to={match.url} />
        </Routes>
    )
}
