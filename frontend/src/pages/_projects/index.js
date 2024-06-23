import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useResolvedPath } from 'react-router'

import GlobalNavBar from 'components/navbars/GlobalNavBar'
import ProjectGallery from './slug'

export default () => {
    const url = useResolvedPath("").pathname;

    return (
        <>
            <GlobalNavBar />
            <Routes>
                <Route
                    exact={false}
                    path={`${match.url}/:slug`}
                    component={ProjectGallery}
                />
                <Navigate to="/" />
            </Routes>
        </>
    )
}
