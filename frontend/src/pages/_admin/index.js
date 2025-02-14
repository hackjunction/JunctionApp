import React from 'react'
import { useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'

import DefaultPage from './default'
// import HackerpackForm from './hackerpack'
// import BannerForm from './banner'
// import OrganizationForm from './organization'

//TODO renable the commented out routes
export default () => {
    const url = useResolvedPath('').pathname
    return (
        <Routes>
            {/* <Route path={`/`} element={<p>TEST</p>} /> */}
            <Route path={`/`} element={<DefaultPage />} />
            {/* <Route
                path={`${url}/hackerpack/:slug`}
                element={<HackerpackForm />}
            />
            <Route path={`${url}/banner/:slug`} element={<BannerForm />} />
            <Route
                path={`${url}/organization/:slug`}
                element={<OrganizationForm />}
            /> */}
            {/* <Navigate to={url} /> */}
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
