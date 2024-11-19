import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginDefault from './default'
import LoginWelcome from './welcome'

export default () => {
    return (
        <>
            <Routes>
                <Route index element={<LoginDefault />} />
                <Route path="welcome" element={<LoginWelcome />} />
            </Routes>
        </>
    )
}
