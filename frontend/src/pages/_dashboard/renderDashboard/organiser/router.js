import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SlugPage from './index'

export default () => {
    return (
        <Routes>
            <Route path={`:slug/*`} element={<SlugPage />} />
        </Routes>
    )
}
