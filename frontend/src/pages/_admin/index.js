import React from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'

import DefaultPage from './default'
import HackerpackForm from './hackerpack'
import BannerForm from './banner'
import OrganizationForm from './organization'

export default () => {
    const url = useResolvedPath("").pathname;
    return (
        <Routes>
            <Route exact={true} path={`${match.url}`} component={DefaultPage} />
            <Route
                exact={false}
                path={`${match.url}/hackerpack/:slug`}
                component={HackerpackForm}
            />
            <Route
                exact={false}
                path={`${match.url}/banner/:slug`}
                component={BannerForm}
            />
            <Route
                exact={false}
                path={`${match.url}/organization/:slug`}
                component={OrganizationForm}
            />
            <Navigate to={match.url} />
        </Routes>
    )
}
