import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SlugPage from './renderDashboard'
import DefaultPage from './renderDashboard/default'

export default () => {
    //redirect to right event page, default, or out
    return (
        <Routes>
            <Route path="event/:slug/*" element={<SlugPage />} />
            <Route path="default/*" element={<DefaultPage />} />
            {/* For all other routes, redirect outta here */}

            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    )
}
