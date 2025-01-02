import React from 'react'
import { useParams, useResolvedPath } from 'react-router'
import { Route, Routes, Navigate } from 'react-router-dom'

// import DefaultPage from './default'
import SlugPage from './index'

export default () => {
    const url = useResolvedPath('').pathname
    const { eventSlug } = useParams()
    console.log('URL rom organizer router>>>>>>>', url)
    console.log('SLUG rom organizer router>>>>>>>', eventSlug)
    return (
        // <div>TEST</div>
        <Routes>
            {/* <Route exact={true} path={`${match.url}`} component={DefaultPage} /> */}
            {/* <Route path={`${url}/:eventSlug/*`} element={<SlugPage />} /> */}
            <Route path={`:eventSlug/*`} element={<SlugPage />} />
            {/* <Route path="*" element={<Navigate to={url} />} /> */}
            {/* <Navigate to={url} /> */}
        </Routes>
    )
}
