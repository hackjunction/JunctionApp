import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useResolvedPath } from 'react-router'

import LoginDefault from './default'
import LoginWelcome from './welcome'

export default () => {
    const url = useResolvedPath("").pathname;
    return (
        <Routes>
            <Route exact path={`${match.url}`} component={LoginDefault} />
            <Route
                exact
                path={`${match.url}/welcome`}
                component={LoginWelcome}
            />
            <Navigate to={`${match.url}`} />
        </Routes>
    )
}
