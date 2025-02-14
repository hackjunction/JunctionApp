import React from 'react'
import { Route, Routes } from 'react-router-dom'

import GlobalNavBar from 'components/navbars/GlobalNavBar'
import ProjectGallery from './slug'

export default () => {
    return (
        <>
            <GlobalNavBar />
            <Routes>
                <Route path={`:slug/*`} element={<ProjectGallery />} />
            </Routes>
        </>
    )
}
